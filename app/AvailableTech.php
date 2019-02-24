<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AvailableTech extends Pivot
{
    protected $table = 'available_techs';
}
