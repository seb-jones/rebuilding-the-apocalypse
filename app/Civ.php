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
        return $this->belongsToMany('App\Tech', 'completed_techs');
    }

    public function availableTechs()
    {
        return $this->belongsToMany('App\Tech', 'available_techs');
    }
}
