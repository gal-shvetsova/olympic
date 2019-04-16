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

Route::get('/user', 'MiddlewareController@get')->middleware('auth:api');


Route::resource('/olympiad', 'OlympiadController');

Route::resource('/student', 'StudentController');

Route::resource('/task', 'TaskController');

