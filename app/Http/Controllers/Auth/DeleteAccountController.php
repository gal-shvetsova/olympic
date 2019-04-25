<?php
/**
 * Created by PhpStorm.
 * User: galina
 * Date: 25.04.19
 * Time: 16:25
 */

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeleteAccountController extends Controller
{
    public function delete(Request $request){
        \App\Student::find($request->id)->deleteStudent();
    }
}