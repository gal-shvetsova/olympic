<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisterController;
use App\Student;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::deleteUser($id);
        return response(200);
    }
}
