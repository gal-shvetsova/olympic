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

Route::any('/password', function () {
    return view('.index');
});

Route::any('/solution/{id}', function () {
    return view('.index');
});

Route::any('/solution', function () {
    return view('.index');
});

Route::any('/login', function () {
    return view('.index');
});

Route::any('/queue/{id}', function () {
    return view('.index');
});

Route::any('/solution/{id}/edit', function () {
    return view('.index');
});