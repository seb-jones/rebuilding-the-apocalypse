<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUnlocksResourceIdToTechs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('techs', function (Blueprint $table) {
            $table->renameColumn('allows_id', 'unlocks_tech_id');
            $table->unsignedInteger('unlocks_resource_id')->nullable();
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
            $table->renameColumn('unlocks_tech_id', 'allows_id');
            $table->dropColumn('unlocks_resource_id');
        });
    }
}
