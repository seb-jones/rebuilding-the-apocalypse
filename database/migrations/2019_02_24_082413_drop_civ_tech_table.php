<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropCivTechTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('civ_tech');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('civ_tech', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('civ_id');
            $table->unsignedInteger('tech_id');
        });
    }
}
