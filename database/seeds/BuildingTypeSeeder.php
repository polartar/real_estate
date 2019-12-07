<?php

use Illuminate\Database\Seeder;
use App\BuildingType;

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
                'rating' => 3
            ],
            [
                'name' => "Elevator",
                'rating' => 4
            ],
            [
                'name' => "Elevator/Doorman",
                'rating' => 5
            ]
        ])->map(function ($item) {
            BuildingType::create([
                "name" => $item['name'],
                "rating" => $item['rating']
            ]);
        });
    }
}
