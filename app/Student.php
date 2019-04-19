<?php

namespace App;

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Student extends Model
{

    private static $default_password = "password";

    public $timestamps = false;

    public function olympiads()
    {
        return $this->belongsToMany('App\Olympiad', 'olym_user_links');
    }

    public function user()
    {
        return $this->hasOne('App\User', 'id');
    }

    public static function getAllStudents()
    {
        return DB::table('students', 'olympiads')
            ->select("students.id", "students.last_name", "students.user_role"
                , DB::raw("(GROUP_CONCAT(olympiads.name SEPARATOR ',')) as 'olympiads'"))
            ->leftjoin('olym_user_links', 'students.id', '=', 'olym_user_links.student_id')
            ->leftjoin('olympiads', 'olym_user_links.olympiad_id', '=', 'olympiads.id')
            ->groupBy('students.id')
            ->get();
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
        $student_del->olympiads()->detach();
        $student_del->user()->delete();
        $student_del->delete();
    }

}
