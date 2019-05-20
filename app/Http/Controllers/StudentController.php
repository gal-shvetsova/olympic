<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisterController;
use App\Student;
use App\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = Student::getAllStudents();
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $content = $request->json()->all();
        Student::addStudent($content);
        $response = Student::sort($content['field'], $content['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $json = $request->json()->all();
        Student::editStudent($json);
        $response = Student::sort($json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @param int $type
     * @param int $field
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $type, $field)
    {
        if (Student::find($id)['user_role'] != "admin")
            Student::deleteStudent($id);
        $response = Student::sort($field, $type);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    public function sort(Request $request)
    {
        $json = $request->json()->all();
        $response = Student::sort($json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);

    }

    public function student()
    {
        return view('index');
    }
}
