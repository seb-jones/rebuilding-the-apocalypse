<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    protected $table = 'researches';

    public function unlocks_research()
    {
        return $this->belongsTo('App\Research', 'unlocks_research_id');
    }

    public function unlocks_material()
    {
        return $this->belongsTo('App\Material', 'unlocks_material_id');
    }
}
