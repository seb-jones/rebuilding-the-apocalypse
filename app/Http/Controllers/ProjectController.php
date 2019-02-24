<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function complete(Request $request)
    {
        $src = DB::table('available_techs')
            ->where ('id', request('id'))
            ->select(['id', 'civ_id', 'tech_id'])
            ->first();

        DB::table('completed_techs')
            ->insert([
                'id' => $src->id,
                'civ_id' => $src->civ_id,
                'tech_id' => $src->tech_id,
            ]);

        DB::table('available_techs')->where('id', request('id'))->delete();
    }
}
