<?php

use Illuminate\Database\Seeder;

class BedroomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            "Room" => 1,
            "Studio" => 1,
            "1" => 1,
            "2" => 2,
            "3" => 3,
            "4" => 4,
            "5" => 5,
        ])->map(function ($name, $value) {
            BedroomType::create([
                "name" => $name,
                "rooms_count" => $value
            ]);
        });
    }
}
