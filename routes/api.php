<?php

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

Route::resource('/solution', 'SolutionController');

Route::resource('/queue', 'QueueController');

Route::post('olympiad/sort', 'OlympiadController@sort');

Route::post('student/sort', 'StudentController@sort');

Route::delete('olympiad/{id}/{type}/{field}', 'OlympiadController@destroy');

Route::delete('student/{id}/{type}/{field}', 'StudentController@destroy');

Route::get('register/confirm/{token}', 'Auth\RegisterController@verifyUser');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::group(['middleware' => ['jwt.auth', 'api-header']], function () {

    // all routes to protected resources are registered here
  //  Route::get('users/list', function () {
    //    $users = App\User::all();

      //  $response = ['success' => true, 'data' => $users];
       // return response()->json($response, 201);
    //});
//});

Route::auth(['verify' => true]);

Route::get('/user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::group(['middleware' => 'api-header'], function () {

    Route::auth();
});


Route::post('olympiad/filter', 'OlympiadController@filter');
