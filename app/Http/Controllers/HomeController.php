<?php

namespace App\Http\Controllers;

use App\AvailableTech;
use App\CompletedTech;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home')
            ->withCiv(Auth::user()->civ);
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
        ]);

        AvailableTech::truncate();
        CompletedTech::truncate();

        $payload = [
            'resources' => [
                'people' => $civ->people,
                'wood' => $civ->wood,
                'metal' => $civ->metal,
                'uranium' => $civ->uranium,
            ],
        ];

        return response($payload, 200);
    }
}
