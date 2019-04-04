<?php

namespace App\Http\Controllers;

use App\Olympiad;
use Illuminate\Http\Request;

class OlympiadController extends Controller
{
    public function index()
    {
        return Olympiad::all();
    }

}
