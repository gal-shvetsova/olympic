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

    public static function progress($content)
    {
        foreach ($content as $solution) {
            $new = Queue::find($solution['id']);
            do {
                $progress = rand(0,5);
            } while ($progress + $solution['progress'] > 100);
            $new['progress'] += $progress;
            $new->save();
        }
    }

    public static function getAll($id)
    {
        return Queue::where('queue.student_id', '=', $id)->
        join('solutions', 'queue.solution_id', '=', 'solutions.id')->
        join('tasks', 'solutions.task_id', '=', 'tasks.id')->
           select('queue.id', 'queue.progress', 'tasks.name', 'tasks.max_score','solutions.score', 'solutions.task_id', 'solutions.id as solution');
    }

    public static function create($element)
    {
        Queue::insert($element);
    }

    public static function updateQueue($id, $task_id, $solution_id){
        $put = Queue::find($id);
        do{
            $progress = rand(0,1);
        } while ($put['progress'] + $progress > 100);
        $put['progress'] += $progress;
        $put->save();
        if ($put['progress'] === 100){
            $max_score = Task::find($task_id)['max_score'];
            $score = rand(0, $max_score);
            $solution =Solution::find($solution_id);
            if ($solution['score'] < 0)
                $solution['score'] = $score;
            $solution->save();
        }
    }
}
