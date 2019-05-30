<?php

namespace App;

use function foo\func;
use Illuminate\Database\Eloquent\Model;
use function PHPSTORM_META\type;

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

    public static function sort($field, $type)
    {
        $olympiads = Olympiad::withCount('users as participants');
        return $olympiads->orderBy($field, $type)->get();
    }

    public static function filter($hardness, $participants, $deadline)
    {
        $olympiads = Olympiad::withCount('users as participants')
            ->where('hardness', '<=', $hardness[1])
            ->where('hardness', '>=', $hardness[0]);
        $today = new \DateTime("NOW");
        switch ($deadline) {
            case 'week':
                $date = new \DateTime("NOW");
                $date->modify('+1 week');
                $olympiads->whereBetween('deadline', [$today->format('Y-m-d'), $date->format('Y-m-d')]);
                break;
            case 'month':
                $date = new \DateTime("NOW");
                $date->modify('+1 month');
                $olympiads->whereBetween('deadline', [$today->format('Y-m-d'), $date->format('Y-m-d')]);
                break;
            case 'year':
                $date = new \DateTime("NOW");
                $date->modify('+1 year');
                $olympiads->whereBetween('deadline', [$today->format('Y-m-d'), $date->format('Y-m-d')]);
                break;
            default:
                break;
        }

        $olympiads = $olympiads->get();
        $filtered = array();
        for ($i = 0; $i < count($olympiads); $i++){
            if ($olympiads[$i]['participants'] <= $participants[1] && $olympiads[$i]['participants'] >= $participants[0])
                $filtered[] = $olympiads[$i];
        }
        return $filtered;
    }

}
