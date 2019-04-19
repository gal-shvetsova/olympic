<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('/olympiad', 'OlympiadController');

Route::resource('/student', 'StudentController');

Route::resource('/task', 'TaskController');


Route::group(['middleware' => ['jwt.auth','api-header']], function () {

    echo "here";
    // all routes to protected resources are registered here
    Route::get('users/list', function(){
        $users = App\User::all();

        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});

//Route::post('register', 'UserController@register');

Route::group(['middleware' => 'api-header'], function () {
    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
});
