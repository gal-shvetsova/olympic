<?php

namespace App\Http\Controllers;

use App\Olympiad;
use Illuminate\Http\Request;
use App\Queue;

class QueueController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $content = $request->json()->all();
        Queue::create($content);
        return response(200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = Queue::getAll($id)->get();
        for ($i = 0; $i < sizeof($response); $i++){
            Queue::updateQueue($response[$i]['id'], $response[$i]['task_id'], $response[$i]['solution']);
        }
        $response = Queue::getAll($id)->get();
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $json = $request->json()->all();
        Olympiad::editOlympiad($json);
        return response(200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
