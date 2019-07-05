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
        unset($newOlympiad['type']);
        unset($newOlympiad['field']);

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


    public static function sortAndFilter($field, $type, $hardness = array(1, 10), $participants = array(0,100), $deadline = 'all' )
    {
        $olympiads = Olympiad::withCount('users as participants')
            ->whereBetween('hardness',  [$hardness[0],$hardness[1]]);

        $today = date('Y-m-d');
        switch ($deadline) {
            case 'week':
                $date = date('Y-m-d', strtotime('+1 week'));
                $olympiads->whereBetween('deadline', [$today, $date]);
                break;
            case 'month':
                $date = date('Y-m-d', strtotime('+1 month'));
                $olympiads->whereBetween('deadline', [$today, $date]);
                break;
            case 'year':
                $date = date('Y-m-d', strtotime('+1 year'));
                $olympiads->whereBetween('deadline', [$today, $date]);
                break;
            default:
                break;
        }
        $olympiads->orderBy($field, $type);
        $olympiads = $olympiads->get();
        $filtered = array();
        for ($i = 0; $i < count($olympiads); $i++){
            if ($olympiads[$i]['participants'] <= $participants[1] && $olympiads[$i]['participants'] >= $participants[0])
                $filtered[] = $olympiads[$i];
        }
        return $filtered;
    }

}
