<?php

use Illuminate\Database\Seeder;
use App\BedroomType;

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
            "Room" => -1,
            "Studio" => 0,
            "1" => 1,
            "2" => 2,
            "3" => 3,
            "4" => 4,
            "5" => 5,
        ])->map(function ($value, $name) {
            BedroomType::updateOrCreate([
                "name" => $name,
                "rooms_count" => $value
            ]);
        });
    }
}
