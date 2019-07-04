<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $content = $request->json()->all();
        Task::addTask($content);
        return $this->sortAndFilter($request);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = Task::getAllTasks($id);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $json = $request->json()->all();
        Task::editTask($json);
        return $this->sortAndFilter($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @param int $field
     * @param int $type
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $type, $field)
    {
        Task::deleteTask($id);
        $response = Task::sortAndFilter($id, $field, $type);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

    public function sortAndFilter(Request $request)
    {
        $json = $request->json()->all();
        if ($request->hardness_filter){
            $response = Task::sortAndFilter($json['olympiad_id'], $json['field'], $json['type'], $json['hardness_filter'], $json['time_filter'], $json['max_score_filter']);
        }else
            $response = Task::sortAndFilter($json['olympiad_id'], $json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

    public function task()
    {
        return view('index');
    }

}
