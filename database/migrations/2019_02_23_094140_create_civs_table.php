<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCivsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('civs', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('people')->default(4);
            $table->unsignedInteger('wood')->default(0);
            $table->unsignedInteger('metal')->default(0);
            $table->unsignedInteger('uranium')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('civs');
    }
}
