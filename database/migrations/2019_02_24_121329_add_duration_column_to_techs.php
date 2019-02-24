<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDurationColumnToTechs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('techs', function (Blueprint $table) {
            $table->unsignedInteger('time_per_tick');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('techs', function (Blueprint $table) {
            $table->dropColumn('time_per_tick');
        });
    }
}
