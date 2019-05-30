<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ForgotPassword;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\User;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

  //  use SendsPasswordResetEmails;

    public function showLinkRequestForm()
    {
        return view('index');
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendResetLinkEmail(Request $request){
        $user = User::where('email', $request->email)->get()->first();
        if (!$user){
            $response = ['success' => false, 'data' => 'Can not found user with this email'];
        } else {
            Mail::to($request->email)->send(new ForgotPassword($user));
            $response = ['success' => true, 'data' => 'Ok'];
        }
        return response($response, 200);
    }

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response($response, 200);
    }

    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response($response, 205);
    }
}
