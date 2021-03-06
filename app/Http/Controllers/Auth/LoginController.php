<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Http\Request;

use App\User;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = "/";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('.index');
    }

    private function getToken($email, $password)
    {
        $token = null;

        try {
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
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

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if (!$user) {
            $response = ['success' => false, 'data' => 'Password or email is invalid'];
            return response()->json($response, 200);
        }
        if ($user->role !== "participant" && !$user->verified) {
            $response = ['success' => false, 'data' => 'You are not verified, please check your mail'];
            return response()->json($response, 200);
        }
        if ($user && \Hash::check($request->password, $user->password))
        {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = ['success' => true,
                'data' =>
                    [
                        'id' => $user->id,
                        'student_id' => $user->student_id,
                        'auth_token' => $user->auth_token,
                        'name' => $user->name,
                        'email' => $user->email,
                        'olympiad_id' => $user->olympiad_id,
                        'role' => $user->role
                    ]];
        } else
            $response = ['success' => false, 'data' => 'Password or email is invalid'];

        return response()->json($response, 201);
    }

}
