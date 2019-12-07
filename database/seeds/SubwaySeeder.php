<?php

use App\Subway;
use Illuminate\Database\Seeder;

class SubwaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            '1', '2', '3', '4', '5', '6', '6d',
            '7', '7d', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J',
            'L', 'M', 'N', 'Q', 'R', 'S', 'W', 'Z'
        ])->each(function ($name) {
            Subway::create([
                "name" => $name,
                "icon" => "/assets/images/subway/$name.png"
            ]);
        });
    }
}
