<?php

namespace App\Http\Controllers;

use App\Solution;
use App\Task;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        echo "index";
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = Solution::getAll($id);
        $answer = '{' . '"' ."table". '"' . ':' . $response . '}';
        return response($answer, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id id of solution
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $response = Solution::getById($id);
        $answer = '{' . '"' ."table". '"' . ':' .$response . '}';
        return response($answer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id  of solution
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $json =$request->json()->all();
        Solution::editSolution($json, $id);
        return response(200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
