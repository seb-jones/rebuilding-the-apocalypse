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
        'has_won',
    ];

    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function completedResearches()
    {
        return $this->belongsToMany('App\Research', 'completed_researches');
    }

    public function availableResearches()
    {
        return $this->belongsToMany('App\Research', 'available_researches')
            ->withPivot('id');
    }
}
