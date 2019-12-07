<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BedroomTypeSeeder::class);
        $this->call(BuildingTypeSeeder::class);
        $this->call(RegionSeeder::class);
        $this->call(NeighborhoodSeeder::class);
        $this->call(SubwaySeeder::class);
        $this->call(AmenitiesSeeder::class);
    }
}
