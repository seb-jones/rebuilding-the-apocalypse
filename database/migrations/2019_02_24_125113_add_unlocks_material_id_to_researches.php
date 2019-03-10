<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUnlocksMaterialIdToResearches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('researches', function (Blueprint $table) {
            $table->unsignedInteger('unlocks_research_id')->nullable();
            $table->unsignedInteger('unlocks_material_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('researches', function (Blueprint $table) {
            $table->dropColumn('unlocks_research_id');
            $table->dropColumn('unlocks_material_id');
        });
    }
}
