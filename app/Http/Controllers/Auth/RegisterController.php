<?php

namespace App\Http\Controllers\Auth;

use App\Olympiad;
use App\Solution;
use App\Task;
use App\User;
use App\Student;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyMail;


use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/task/1';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'olympiad_id' => $data['olympiad_id'] ? $data['olympiad_id'] : 0
        ]);
    }

    public function confirmEmail(Request $request, $token)
    {
        User::whereToken($token)->firstOrFail()->confirmEmail();
        return response()->json("OK", 200);
    }

    public function showRegistrationForm()
    {
        return view('.index');
    }

    private function getToken($email, $password)
    {
        $token = null;
        try {
            if (!$token = auth('api')->attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    public function verifyUser($token)
    {
        $user = User::where('token', $token)->get()->first();
        if (!$user->verified) {
            $user->verified = 1;
            $user->save();
        } else {
            return response()->json([
                'response' => 'ok',
                'message' => 'User already verified',
            ]);
        }

        return response()->json([
            'response' => 'ok',
            'message' => 'Successfully verified',
        ]);
    }

    private function registerUser(Request $request)
    {
        if (User::where('email', $request->email)->get()->first()){
            return response()->json(['success' => false, 'data' => 'User with this email already exist'], 200);
        }

        $student = new Student();
        $student['last_name'] = $request->name;
        $student['user_role'] = $request->role;
        $student->save();
        $student_id = $student['id'];
        $payload = [
            'password' => \Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'auth_token' => '',
            'olympiad_id' => $request->olympiad_id,
            'role' => $request->role,
            'student_id' => $student_id
        ];
        $user = new User($payload);
        if ($user->save()) {

            $token = self::getToken($request->email, $request->password);

            if (!is_string($token)) return response()->json(['success' => false, 'data' => 'Token generation failed', 'err' => $token], 201);

            $user = User::where('email', $request->email)->get()->first();
            $user->auth_token = $token;
            $user->save();
            Mail::to($request->email)->send(new VerifyMail($user));
            $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->student_id, 'email' => $request->email, 'auth_token' => $token, 'olympiad_id' => $user->olympiad_id, 'role' => 'guest']];
        } else
            $response = ['success' => false, 'data' => 'Couldnt register user'];
        return response()->json($response, 201);
    }

    private function registerParticipant(Request $request)
    {
        $student_id = $request->student_id;

        if ($accounts = Student::find($student_id)) {
            if ($accounts->user()->where('olympiad_id', '=', $request->olympiad_id)->count() > 1) {
                $response = ['success' => false, 'data' => 'You already joined this olympiad'];
                return response()->json($response, 201);
            }
        }

        $payload = [
            'password' => \Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'auth_token' => '',
            'olympiad_id' => $request->olympiad_id,
            'role' => $request->role,
            'student_id' => $student_id
        ];

        $user = new User($payload);

        if ($user->save()) {

            $token = self::getToken($request->email, $request->password);

            if (!is_string($token)) return response()->json(['success' => false, 'data' => 'Token generation failed', 'err' => $token], 201);

            $user = User::where('email', $request->email)->get()->first();
            $user->auth_token = $token;
            $user->save();

            foreach (Olympiad::find($request->olympiad_id)->tasks()->get() as $task) {
                $solution = new Solution();
                $solution['start'] = date("Y-m-d H:i:s", mktime(0, 0, 0, 0, 0, 0000));
                $solution['student_id'] = $request->student_id;
                $solution['olympiad_id'] = $request->olympiad_id;
                $solution['task_id'] = $task['id'];
                $solution['status'] = "not started";
                $solution['score'] = -1;
                $solution->save();
            }
            $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->student_id, 'email' => $request->email, 'auth_token' => $token, 'olympiad_id' => $user->olympiad_id, 'role' => 'participant']];
        } else
            $response = ['success' => false, 'data' => 'Couldnt register user'];
        return response()->json($response, 201);
    }

    public function register(Request $request)
    {
        if ($request->role === 'participant')
            return $this->registerParticipant($request);
        else
            return $this->registerUser($request);
    }
}
