<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Resource extends Model
{
    public function unlocked_by()
    {
        return $this->hasOne('App\Tech', 'unlocks_resource_id');
    }

    public static function getUnlocked()
    {
        $unlocked = [];

        $resources = Resource::all();

        foreach ($resources as $resource) {
            $unlocked_by = $resource->unlocked_by;

            // There is no tech that unlocks this, so we add it to
            // unlocked by default
            if (!$unlocked_by) {
                $unlocked[] = $resource;
            }
            else if ($unlocked_by->id) {
                $result = DB::table('completed_techs')->select('id')->where('id', $unlocked_by->id)->get();
                if ($result->count() > 0) {
                    $unlocked[] = $resource;
                }
            }
        }

        return $unlocked;
    }
}
