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
       return $this->sortAndFilter($request);
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
       return $this->sortAndFilter($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @param int $type
     * @param int $field
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $type = null, $field = null)
    {
        if (Student::find($id)['user_role'] != "admin")
            Student::deleteStudent($id);
        if ($type) {
            $response = Student::sortAndFilter($field, $type);
            $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
            return response($answer, 200);
        }
        return response( 200);
    }

    public function sort(Request $request)
    {
        $json = $request->json()->all();
        $response = Student::sortAndFilter($json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);

    }

    public function sortAndFilter(Request $request)
    {
        $json = $request->json()->all();
        if ($request->role_filter)
            $response = Student::sortAndFilter( $json['field'], $json['type'], $json['olympiads_filter'], $json['role_filter']);
        else
            $response = Student::sortAndFilter($json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

    public function student()
    {
        return view('index');
    }
}
