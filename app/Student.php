<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Student extends Model
{
    public static function getAllStudents()
    {
        return DB::table('students', 'olympiads')
            ->select("students.id", "students.last_name", "students.user_role"
                , DB::raw("(GROUP_CONCAT(olympiads.name SEPARATOR ',')) as 'olympiads'"))
            ->leftjoin('olym_user_links', 'students.id', '=', 'olym_user_links.id_user')
            ->leftjoin('olympiads', 'olym_user_links.id_olympiad', '=', 'olympiads.id')
            ->groupBy('students.id')
            ->get();
    }

    public static function addStudent($newStudent)
    {
        DB::table('students')->insert($newStudent);
    }

    public static function editStudent($student){
        DB::table('students')->where('id', '=', $student->id)
            ->update(['last_name' => $student->last_name,
                        'user_role' => $student->user_role]);
    }

    public static function deleteStudent($student){
        DB::table('olym_user_links')->where('id_user', '=', $student)->delete();
        DB::table('students')->delete($student);
    }

}
