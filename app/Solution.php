<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Integer;

class Solution extends Model
{

    public $timestamps = false;

    public function task()
    {
        return $this->belongsTo('App\Task', 'task_id', 'id');
    }

    public function user()
    {
        return $this->hasOne('\App\User', 'id', 'student_id');
    }

    public function queue(){
        return $this->hasOne('\App\Queue', 'solution_id', 'id');
    }

    public static function getAll($id){
        return Solution::where('student_id', '=', $id)->join('tasks', 'tasks.id', '=', 'solutions.task_id')->
        select('name', 'description', 'hardness', 'time', 'start', 'status', 'max_score', 'score', 'solutions.id')->get();
    }

    public static function getById($id){
        $solution = Solution::find($id);
        $solution['status'] = 'solving';
        $solution['start'] = (new \DateTime("NOW"))->format('Y-m-d H:i:s');
        $solution->save();
        return Solution::where('solutions.id', '=', $id)->join('tasks', 'tasks.id', '=', 'solutions.task_id')->
        select('name', 'description', 'hardness', 'time', 'start', 'status', 'max_score', 'score', 'solutions.id')->get();
    }

    public static function editSolution($solution, $id){
        $put_solution = Solution::find($id);
        $put_solution['start'] = date ("Y-m-d H:i:s", strtotime($put_solution['start']) + intval($solution['start']));
        $put_solution['status'] = $solution['status'];
        $put_solution->save();
    }
}
