<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    protected $table = 'queue';
    public $timestamps = false;

    public function solution()
    {
        return $this->hasOne('App\Solution', 'solution_id', 'id');
    }


    public static function getAll($id){
        return Queue::where('queue.student_id', '=', $id)->join('solutions', 'queue.solution_id', '=', 'solutions.id')->join('tasks', 'solutions.task_id', '=', 'tasks.id')->get();
    }

    public static function create($element){
        Queue::insert($element);
    }
}
