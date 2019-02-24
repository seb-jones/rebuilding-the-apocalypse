<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CompletedTech extends Pivot
{
    protected $table = 'completed_techs';
}
