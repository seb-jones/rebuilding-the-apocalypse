<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tech extends Model
{
    protected $table = 'techs';

    public function allows()
    {
        return $this->belongsTo('App\Tech', 'allows_id');
    }
}
