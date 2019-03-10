<?php

namespace App\Http\Controllers;

use App\Tech;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ResearchController extends Controller
{
    public function complete(Request $request)
    {
        $src = DB::table('available_researches')
            ->where ('id', request('id'))
            ->select(['id', 'civ_id', 'research_id'])
            ->first();

        DB::table('completed_researches')
            ->insert([
                'id' => $src->id,
                'civ_id' => $src->civ_id,
                'research_id' => $src->research_id,
            ]);

        DB::table('available_researches')
            ->where('id', request('id'))
            ->delete();

        $research = Tech::find($src->research_id);

        $unlocked = [];

        $unlocked_research = $research->unlocks_research;

        if ($unlocked_research !== null) {
            DB::table('available_researches')
                ->insert([
                    'civ_id' => $src->civ_id,
                    'research_id' => $unlocked_research->id,
                ]);

            $unlocked['research'] = $unlocked_research;
        }

        $unlocked_resource = $research->unlocks_material;

        if ($unlocked_resource !== null) {
            $unlocked['resource'] = $unlocked_resource;
        }

        return response($unlocked, 200);
    }
}
