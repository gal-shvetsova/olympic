<?php

namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');
ini_set('display_errors',0);


class SiteController extends Controller
{
    public function index(){
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'POST':

                  //  postHandler($db, file_get_contents('php://input'));
                    break;
                case 'PUT':
                 //   putHandler($db, file_get_contents('php://input'));
                    break;
                case 'DELETE':
                 //   deleteHandler($db, file_get_contents('php://input'));
                    break;
                case 'GET':
                 //   getHandler($db);
                    return view('index', ['test' => Student::all()]);
                    break;
            }
        return view('test', [Student::all()]);
    }

    public function olympiad(){
        return view('olympiad');
    }

    public function task(){
        return view('task');
    }

    public function user(){
        return view('user');
    }

    public function login(){
        return view('login');
    }
}
