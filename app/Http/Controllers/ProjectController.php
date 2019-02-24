<?php

namespace App\Http\Controllers;

use App\Tech;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function complete(Request $request)
    {
        $src = DB::table('available_techs')
            ->where ('id', $request->id)
            ->select(['id', 'civ_id', 'tech_id'])
            ->first();

        DB::table('completed_techs')
            ->insert([
                'id' => $src->id,
                'civ_id' => $src->civ_id,
                'tech_id' => $src->tech_id,
            ]);

        DB::table('available_techs')
            ->where('id', $request->id)
            ->delete();

        $tech = Tech::find($src->tech_id);

        $unlocked = [];

        $unlocked_tech = $tech->unlocks_tech;

        if ($unlocked_tech) {
            DB::table('available_techs')
                ->insert([
                    'civ_id' => $src->civ_id,
                    'tech_id' => $unlocked_tech->id,
                ]);

            $unlocked['tech'] = $unlocked_tech;
        }

        $unlocked_resource = $tech->unlocks_resource;

        if ($unlocked_resource) {
            $unlocked['resource'] = $unlocked_resource;
        }

        return response($unlocked, 200);
    }
}
