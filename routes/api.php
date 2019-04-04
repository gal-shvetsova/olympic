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

//olympiads

Route::get('/olympiad', function () {
    $answer = '{"olympiads": '.\App\Olympiad::getAllOlympiads().'}';
    return response($answer,200);
});

Route::post('/olympiad', function () {
    $json = json_decode(file_get_contents('php://input'), true);
    \App\Olympiad::addOlympiad($json);
    return response(200);
});

Route::delete('/olympiad', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Olympiad::deleteOlympiad($json->id);
});

Route::put('/olympiad', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Olympiad::editOlympiad($json);
    return response(200);
});

//users

Route::get('/user', function () {
    $answer = '{"users": '.\App\Student::getAllStudents().'}';
    return response($answer ,200);
});

Route::post('/user', function () {
    $json = json_decode(file_get_contents('php://input'), true);
    \App\Student::addStudent($json);
    return response(200);
});

Route::delete('/user', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Student::deleteStudent($json->id);
});

Route::put('/user', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Student::editStudent($json);
    return response(200);
});

//tasks

Route::get('/task/{id_olym}', function ($id_olym) {
    $answer = '{"tasks": '.\App\Task::getAllTasks($id_olym).'}';
    return response($answer ,200);
});

Route::post('/task/{id_olym}', function () {
    $json = json_decode(file_get_contents('php://input'), true);
    \App\Task::addTask($json);
    return response(200);
});

Route::delete('/task/{id_olym}', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Task::deleteTask($json->id);
});

Route::put('/task/{id_olym}', function(){
    $json = json_decode(file_get_contents('php://input'));
    \App\Task::editTask($json);
    return response(200);
});
