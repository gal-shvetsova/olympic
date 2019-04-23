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

Route::any('/join', function () {
    return view('.index');
});


Route::get('/home', 'HomeController@index')->name('home');

