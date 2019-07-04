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

Route::delete('olympiad/{id}/{type}/{field}', 'OlympiadController@destroy');

Route::delete('student/{id}/{type}/{field}', 'StudentController@destroy');

Route::get('register/confirm/{token}', 'Auth\RegisterController@verifyUser');

Route::middleware('auth:api')->get('/user','UserController@auth');

Route::auth(['verify' => true]);

Route::get('/user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::group(['middleware' => 'api-header'], function () {

    Route::auth();
});


Route::post('olympiad/filter', 'OlympiadController@sortAndFilter');
Route::post('task/filter', 'TaskController@sortAndFilter');
Route::post('student/filter', 'StudentController@sortAndFilter');

