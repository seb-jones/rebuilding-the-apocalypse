<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTechsTableToHaveRequirements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('techs', function (Blueprint $table) {
            $table->dropColumn('cost_in_people');
            $table->dropColumn('image');
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');

            $table->string('label');
            $table->unsignedInteger('people')->default(0);
            $table->unsignedInteger('wood')->default(0);
            $table->unsignedInteger('metal')->default(0);
            $table->unsignedInteger('uranium')->default(0);
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
            $table->unsignedInteger('cost_in_people');
            $table->string('image');
            $table->timestamps();

            $table->dropColumn('label');
            $table->dropColumn('people');
            $table->dropColumn('wood');
            $table->dropColumn('metal');
            $table->dropColumn('uranium');
        });
    }
}
