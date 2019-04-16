<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Student extends Model
{
    public $timestamps = false;

    public function olympiads()
    {
        return $this->belongsToMany('App\Olympiad', 'olym_user_links');
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
        Student::insert($newStudent);
    }

    public static function editStudent($student)
    {
        $put_student = Student::find($student['id']);
        $put_student['last_name'] = $student['last_name'];
        $put_student['user_role'] = $student['user_role'];
        $put_student->save();
    }

    public static function deleteStudent($student)
    {
        $student_del = Olympiad::find($student);
        $student_del->olympiads()->detach();
        $student_del->delete();
    }

}
