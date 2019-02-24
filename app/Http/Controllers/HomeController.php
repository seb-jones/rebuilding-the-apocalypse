<?php

namespace App\Http\Controllers;

use App\AvailableTech;
use App\CompletedTech;
use App\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        return view('home')
            ->withCiv(Auth::user()->civ)
            ->with(['resourceData' => Resource::getUnlocked()]);
    }

    public function reset()
    {
        $user = Auth::user();
        $civ = $user->civ;

        $civ->update([
            'people' => '4',
            'wood' => '0',
            'metal' => '0',
            'uranium' => '0',
            'has_won' => '1',
        ]);

        DB::table('available_techs')->where('civ_id', $civ->id)->delete();
        DB::table('completed_techs')->where('civ_id', $civ->id)->delete();

        DB::table('available_techs')->insert([
            'civ_id' => $civ->id,
            'tech_id' => 1
        ]);

        return redirect('/');
    }
}
