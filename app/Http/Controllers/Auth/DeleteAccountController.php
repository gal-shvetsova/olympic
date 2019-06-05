<?php
/**
 * Created by PhpStorm.
 * User: galina
 * Date: 25.04.19
 * Time: 16:25
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class DeleteAccountController extends Controller
{

    public function delete($id){
        \App\User::find($id)->deleteStudent();
    }
}