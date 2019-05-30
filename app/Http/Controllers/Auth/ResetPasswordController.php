<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
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

    public function reset(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)) {
            $user->password = \Hash::make($request->new_password);
            $user->save();
            $token = self::getToken($user->email, $request->new_password);
            if (!is_string($token)) return response()->json(['success' => false, 'data' => 'Token generation failed'], 201);
                $user->auth_token = $token;
                $user->save();
            $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->student_id, 'email' => $user->email, 'auth_token' => $token, 'olympiad_id' => $user->olympiad_id, 'role' => $user->role]];
        } else
            $response = ['success' => false, 'data' => 'Couldnt reset password'];
        return response()->json($response, 200);
    }

    public function showResetForm(){
        return view('index');
    }
}
