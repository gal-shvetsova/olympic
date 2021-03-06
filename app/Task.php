<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public $timestamps = false;

    public function olympiad()
    {
        return $this->belongsTo(Olympiad::class);
    }

    public function solution(){
        return $this->hasMany('App\Solution', 'task_id', 'id');
    }

    public static function getAllTasks($olym_id)
    {
        return Task::where('olympiad_id','=', $olym_id)->get();
    }

    public static function getTask($id)
    {
        return Task::where('id', '=', $id);
    }

    public static function addTask($newTask)
    {
        unset($newTask['type']);
        unset($newTask['field']);
        Task::insert($newTask);
    }

    public static function editTask($task){
        $put_task = Task::find($task['id']);
        $put_task['name'] = $task['name'];
        $put_task['description'] = $task['description'];
        $put_task['hardness'] = $task['hardness'];
        $put_task['time'] = $task['time'];
        $put_task['olympiad_id'] = $task['olympiad_id'];
        $put_task['max_score'] = $task['max_score'];
        $put_task->save();
    }

    public static function deleteTask($task)
    {
        $task_del = Task::find($task);
        $task_del->delete();
    }

    public static function sort($id, $field, $type){
        $task = Task::where('olympiad_id','=', $id);
        return $task->orderBy($field, $type)->get();
    }

    public static function sortAndFilter($id, $field, $type, $hardness = [0,10], $time = [0,7], $max_score = [0,100])
    {
        $task = Task::where('olympiad_id','=', $id)
            ->whereBetween('hardness', $hardness)
            ->whereBetween('max_score', $max_score);
        $from = '0'.$time[0].':00:00';
        $to = '0'.$time[1].':00:00';
        $task->whereBetween('time', [$from, $to]);
        return $task->orderBy($field, $type)->get();
    }
}
