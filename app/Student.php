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
            $query->where('role', '=', 'participant');
        }])->get();
    }

    public static function addStudent($newStudent)
    {
        $user = new Request();
        $user->name = $newStudent['last_name'];
        $user->email = $newStudent['email'];
        $user->password = Student::$default_password;
        $user->role = $newStudent['user_role'];
        $user->olympiad_id = -1;
        $register = new RegisterController();
        $register->register($user);
    }

    public static function editStudent($student)
    {
        $put_student = Student::find($student['id']);
        $put_student['last_name'] = $student['last_name'];
        $put_student['user_role'] = $student['user_role'];
        $put_student->save();
        $put_user = $put_student->user()->first();
        $id = $put_user['id'];
        $user = User::find($id);
        $user['name'] = $put_student['last_name'];
        $user->save();
    }

    public static function deleteStudent($student)
    {
        $student_del = Student::find($student);
        if ($student_del) {
            $student_del->user()->delete($student);
            $student_del->delete();
        }
    }


    public static function sortAndFilter($field, $type, $olympiads = [0,10], $role='all' )
    {
        $student = Student::withCount(['user as olympiads' => function ($query) {
            $query->where('role', '=', 'participant');
        }]);
        if ($role !== 'all')
            $student->where('user_role', '=', $role);

        $student = $student->orderBy($field, $type)->get();
        $filtered = array();
        for ($i = 0; $i < count($student); $i++) {
            if ($student[$i]['olympiads'] <= $olympiads[1] && $student[$i]['olympiads'] >= $olympiads[0])
                $filtered[] = $student[$i];
        }
        return $filtered;
    }

}
