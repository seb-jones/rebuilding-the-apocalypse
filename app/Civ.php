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

    public function completedTechs()
    {
        return $this->belongsToMany('App\Tech')->using('App\CompletedTech');
    }

    public function availableTechs()
    {
        return $this->belongsToMany('App\Tech')->using('App\AvailableTech');
    }
}
