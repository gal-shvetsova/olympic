<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Olympiad extends Model
{
    protected $fillable = ['name', 'hardness', 'deadline'];
    public $timestamps = false;


    public function students()
    {
        return $this->belongsToMany('App\Student', 'olym_user_links');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }

    public static function getAllOlympiads()
    {
        $olympiads = Olympiad::withCount('students')->get();
        return $olympiads;
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
        $olympiad_del->students()->detach();
        $olympiad_del->tasks()->delete($olympiad);
        $olympiad_del->delete();
    }

}
