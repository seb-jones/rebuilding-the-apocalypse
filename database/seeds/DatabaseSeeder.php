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
                'time_per_tick' => '5',
            ],

            [
                'name' => 'wood',
                'label' => 'Wood',
                'assignment_label' => 'Gather Wood',
                'time_per_tick' => '10',
            ],

            [
                'name' => 'metal',
                'label' => 'Metal',
                'assignment_label' => 'Mine Ore',
                'time_per_tick' => '15',
            ],

            [
                'name' => 'uranium',
                'label' => 'Uranium',
                'assignment_label' => 'Enrich Uranium',
                'time_per_tick' => '20',
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
                'time_per_tick' => '20',
                'unlocks_tech_id' => '2',
                'unlocks_resource_id' => NULL,
            ],

            [
                'name' => 'lumber_jacking',
                'label' => 'Lumber',
                'people' => '3',
                'wood' => '0',
                'metal' => '0',
                'uranium' => '0',
                'time_per_tick' => '30',
                'unlocks_tech_id' => '3',
                'unlocks_resource_id' => '2',
            ],

            [
                'name' => 'mining',
                'label' => 'Mining',
                'people' => '4',
                'wood' => '2',
                'metal' => '0',
                'uranium' => '0',
                'time_per_tick' => '40',
                'unlocks_tech_id' => '4',
                'unlocks_resource_id' => '3',
            ],

            [
                'name' => 'fusion',
                'label' => 'Nuclear Fusion',
                'people' => '6',
                'wood' => '4',
                'metal' => '2',
                'uranium' => '0',
                'time_per_tick' => '50',
                'unlocks_tech_id' => '5',
                'unlocks_resource_id' => '4',
            ],

            [
                'name' => 'nukes',
                'label' => 'Nuclear Warheads',
                'people' => '10',
                'wood' => '7',
                'metal' => '5',
                'uranium' => '3',
                'time_per_tick' => '70',
                'unlocks_tech_id' => NULL,
                'unlocks_resource_id' => NULL,
            ],
        ]);
    }
}
