<?php

use Illuminate\Database\Seeder;
use Database\Seeds\ResourceSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //
        // Resources
        //
        DB::table('resources')->insert([
            [
                'name' => 'people',
                'label' => 'People',
                'assignment_label' => 'Recruit People',
                'time_per_tick' => '50',
            ],

            [
                'name' => 'wood',
                'label' => 'Wood',
                'assignment_label' => 'Gather Wood',
                'time_per_tick' => '100',
            ],

            [
                'name' => 'metal',
                'label' => 'Metal',
                'assignment_label' => 'Mine Ore',
                'time_per_tick' => '200',
            ],

            [
                'name' => 'uranium',
                'label' => 'Uranium',
                'assignment_label' => 'Enrich Uranium',
                'time_per_tick' => '500',
            ],
        ]);

        //
        // Techs
        //
        DB::table('techs')->insert([
            [
                'name' => 'farming',
                'label' => 'Farming',
                'people' => '5',
                'wood' => '0',
                'metal' => '0',
                'uranium' => '0',
                'time_per_tick' => '50',
                'unlocks_tech_id' => '2',
                'unlocks_resource_id' => NULL,
            ],
            [
                'name' => 'lumber_jacking',
                'label' => 'Lumber',
                'people' => '10',
                'wood' => '0',
                'metal' => '0',
                'uranium' => '0',
                'time_per_tick' => '100',
                'unlocks_tech_id' => NULL,
                'unlocks_resource_id' => '2',
            ],
        ]);
    }
}
