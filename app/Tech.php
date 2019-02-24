<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tech extends Model
{
    protected $table = 'techs';

    public function unlocks_tech()
    {
        return $this->belongsTo('App\Tech', 'unlocks_tech_id');
    }

    public function unlocks_resource()
    {
        return $this->belongsTo('App\Resource', 'unlocks_resource_id');
    }
}
