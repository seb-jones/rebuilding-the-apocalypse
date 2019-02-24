<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends Controller
{
    public function increment(Request $request)
    {
        if (isset($request->name)) {
            $civ = Auth::user()->civ;
            $civ[$request->name] = $civ[$request->name] + 1;

            $quantity = $civ[$request->name];

            $civ->save();

            return response(['name' => $request->name, 
                'quantity' => $quantity], 200);
        }
        else {
            return response('No resource name specified', 500);
        }
    }

    public function pay(Request $request)
    {
        $civ = Auth::user()->civ;

        $new_resources = [];

        foreach ($request->all() as $k => $v) {
            $new_resources[$k] = $civ[$k] - $v;
        }

        $civ->update($new_resources);
    }
}
