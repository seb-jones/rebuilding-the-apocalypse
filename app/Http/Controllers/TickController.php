<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TickController extends Controller
{
    public function tick()
    {
        return response("Hello", 200);
    }
}
