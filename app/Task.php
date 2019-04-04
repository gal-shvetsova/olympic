<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Task extends Model
{
    public static function getAllTasks($olym_id)
    {
        return DB::table('tasks', 'olympiads')
            ->where('tasks.olym_id','=', $olym_id)
            ->get();
    }

    public static function addTask($newTask)
    {
        DB::table('tasks')->insert($newTask);
    }

    public static function editTask($task){
        DB::table('tasks')->where('id', '=', $task->id)
            ->update(['name' => $task->name,
                'description' => $task->description,
                'hardness' => $task->hardness,
                'time' => $task->time]);
    }

    public static function deleteTask($task)
    {
        DB::table('tasks')->delete($task);
    }
}
