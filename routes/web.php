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

Route::get('/', 'SiteController@index');

Route::get('/olympiad', 'SiteController@olympiad');

Route::get('/task/{id_olym}', 'SiteController@task');

Route::get('/task/', function() {
    return redirect('http://olympic.test/olympiad');
});

Route::get('/user', 'SiteController@user');

Route::get('/login', 'SiteController@login');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
