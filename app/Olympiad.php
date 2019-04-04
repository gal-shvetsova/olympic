<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Olympiad extends Model
{
    protected $fillable = ['name', 'hardness', 'deadline', 'participants'];
    public static function getAllOlympiads()
    {
        return DB::table('olympiads', 'students')
            ->select("olympiads.id", "olympiads.name" , "olympiads.hardness", "olympiads.deadline"
                , DB::raw("COUNT(olym_user_links.id_user) as 'participants'"))
            ->leftjoin('olym_user_links', 'olympiads.id', '=', 'olym_user_links.id_olympiad')
            ->groupBy('olympiads.id')
            ->get();
    }

    public static function addOlympiad($newOlympiad)
    {
        DB::table('olympiads')->insert($newOlympiad);
    }

    public static function editOlympiad($olympiad){
        DB::table('olympiads')->where('id', '=', $olympiad->id)
            ->update(['name' => $olympiad->name,
                'hardness' => $olympiad->hardness,
                'deadline' => $olympiad->deadline]);
    }

    public static function deleteOlympiad($olympiad){
        DB::table('olym_user_links')->where('id_olympiad', '=', $olympiad)->delete();
        DB::table('olympiads')->delete($olympiad);
    }

}
