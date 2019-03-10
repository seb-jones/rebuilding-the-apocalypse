<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Material extends Model
{
    public function unlocked_by()
    {
        return $this->hasOne('App\Research', 'unlocks_material_id');
    }

    public static function getUnlocked()
    {
        $unlocked = [];

        $materials = Material::all();

        foreach ($materials as $material) {
            $unlocked_by = $material->unlocked_by;

            // There is no research that unlocks this, so we add it to
            // unlocked by default
            if (!$unlocked_by) {
                $unlocked[] = $material;
            }
            else if ($unlocked_by->id) {
                $result = DB::table('completed_researches')->select('id')->where('id', $unlocked_by->id)->where('civ_id', Auth::user()->id)->get();
                if ($result->count() > 0) {
                    $unlocked[] = $material;
                }
            }
        }

        return $unlocked;
    }
}
