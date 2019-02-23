<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Civ extends Model
{
    protected $fillable = [
        'people',
        'wood',
        'metal',
        'uranium',
    ];

    public function user()
    {
        return $this->hasOne('App\User');
    }
}
