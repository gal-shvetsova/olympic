<?php
/**
 * Created by PhpStorm.
 * User: galina
 * Date: 16.04.19
 * Time: 9:45
 */

namespace App\Http\Controllers;


class MiddlewareController
{
    function get(Request $request)
    {
        return $request->user();
    }

    function channel ($user, $id) {
        return (int) $user->id === (int) $id;
    }
}