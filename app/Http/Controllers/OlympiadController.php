<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Olympiad;

class OlympiadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = Olympiad::getAllOlympiads();
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
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
        Olympiad::addOlympiad($content);
        $response = Olympiad::sort($content['field'], $content['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $json = $request->json()->all();
        Olympiad::editOlympiad($json);
        $response = Olympiad::sort($json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @param int $field
     * @param int $type
     * @return \Illuminate\Http\Response
     */

    public function destroy($id, $type, $field)
    {
        Olympiad::deleteOlympiad($id);
        $response = Olympiad::sort($field, $type);
        $answer = '{' . '"' . "table" . '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    public function olympiad()
    {
        return view('index');
    }

    public function sortAndFilter(Request $request)
    {
        $json = $request->json()->all();
        $response = Olympiad::sortAndFilter($json['hardness'], $json['participants'], $json['deadline'],  $json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

}
