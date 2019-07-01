<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::any('olympiad', 'OlympiadController@olympiad');

Route::any('/student', 'StudentController@student');

Route::any('/task/{id}', 'TaskController@task');

Route::any('/join', 'Controller@index');

Route::any('/password', 'Controller@index');

Route::any('/solution/{id}', 'Controller@index');

Route::any('/solution', 'Controller@index');

Route::any('/login', 'Controller@index');

Route::any('/queue/{id}', 'Controller@index');

Route::any('/solution/{id}/edit', 'Controller@index');

Route::any('/register/confirm/{token}', 'Controller@index');

Route::auth(['verify' => true]);