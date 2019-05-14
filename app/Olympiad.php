<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Olympiad extends Model
{
    protected $fillable = ['name', 'hardness', 'deadline', 'student_id'];
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany('App\User', 'olympiad_id', 'id');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }

    public static function getAllOlympiads()
    {
        return Olympiad::withCount('users as participants')->get();
    }

    public static function addOlympiad($newOlympiad)
    {
        Olympiad::insert($newOlympiad);
    }

    public static function editOlympiad($olympiad)
    {
        $put_olympiad = Olympiad::find($olympiad['id']);
        $put_olympiad['name'] = $olympiad['name'];
        $put_olympiad['hardness'] = $olympiad['hardness'];
        $put_olympiad['deadline'] = $olympiad['deadline'];
        $put_olympiad->save();

    }

    public static function deleteOlympiad($olympiad)
    {
        $olympiad_del = Olympiad::find($olympiad);
        $olympiad_del->users()->delete();
        $olympiad_del->tasks()->delete($olympiad);
        $olympiad_del->delete();
    }

    public static function sort($field, $type){
        $olympiads = Olympiad::withCount('users as participants');
        return $olympiads->orderBy($field, $type)->get();
    }

}
