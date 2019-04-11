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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//olympiad

Route::put('/olympiad','OlympiadController@update');
Route::delete('/olympiad','OlympiadController@destroy');
Route::resource('/olympiad', 'OlympiadController');

//student

Route::put('/user','StudentController@update');
Route::delete('/user','StudentController@destroy');
Route::resource('/user', 'StudentController');

//tasks

Route::post('/task/{id}','TaskController@store');
Route::put('/task','TaskController@update');
Route::delete('/task','TaskController@destroy');
Route::resource('/task', 'TaskController');

