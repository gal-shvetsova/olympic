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
        $json = $request->json()->all();
        Olympiad::addOlympiad($json);
        return $this->sortAndFilter($request);
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
       return $this->sortAndFilter($request);
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
        $response = Olympiad::sortAndFilter($field, $type);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

    public function olympiad()
    {
        return view('index');
    }

    public function sortAndFilter(Request $request)
    {
        $json = $request->json()->all();
        if ($request->hardness_filter)
            $response = Olympiad::sortAndFilter( $json['field'], $json['type'], $json['hardness_filter'], $json['participants_filter'], $json['deadline_filter']);
        else
            $response = Olympiad::sortAndFilter( $json['field'], $json['type']);
        $answer = '{' . '"' . "table" . '"' . ':' . json_encode($response) . '}';
        return response($answer, 200);
    }

}
