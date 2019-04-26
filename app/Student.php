<?php

namespace App;

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Student extends Model
{

    private static $default_password = "password";

    public $timestamps = false;

    public function user()
    {
        return $this->hasMany('App\User', 'student_id', 'id');
    }

    public static function getAllStudents()
    {
        return Student::withCount(['user as olympiads' => function ($query) {
            $query->where('role', '=', 'participant');}])->get();
    }

    public static function addStudent($newStudent)
    {
        $student['last_name'] = $newStudent['last_name'];
        $student['user_role'] = $newStudent['user_role'];
        $user = new Request();
        $user->name = $student['last_name'];
        $user->email = $newStudent['email'];
        $user->password = Student::$default_password;
        $user->flag = true;
        Student::insert($student);
        $register = new RegisterController();
        $register->register($user);
    }

    public static function editStudent($student)
    {
        $put_student = Student::find($student['id']);
        $put_student['last_name'] = $student['last_name'];
        $put_student['user_role'] = $student['user_role'];
        $put_student->save();
        $put_user = $put_student->user;
        $put_user['name'] = $put_student['last_name'];
        $put_user->save();
    }

    public static function deleteStudent($student)
    {
        $student_del = Student::find($student);
        $student_del->user()->delete($student);
        $student_del->delete();
    }

}
