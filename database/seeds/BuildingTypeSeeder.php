<?php

use Illuminate\Database\Seeder;

class BuildingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => "Walk Up",
            ],
            [
                'name' => "Elevator",
            ],
            [
                'name' => "Elevator Doorman",
            ]
        ])->map(function ($item) {
            BuildingType::create([
                "name" => $item['name']
            ]);
        });
    }
}
