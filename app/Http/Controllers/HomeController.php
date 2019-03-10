<?php

namespace App\Http\Controllers;

use App\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        return view('home')
            ->withCiv(Auth::user()->civ)
            ->with(['materialData' => Material::getUnlocked()]);
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

        DB::table('available_researches')->where('civ_id', $civ->id)->delete();
        DB::table('completed_researches')->where('civ_id', $civ->id)->delete();

        DB::table('available_researches')->insert([
            'civ_id' => $civ->id,
            'research_id' => 1
        ]);

        return redirect('/');
    }
}
