<?php

use Illuminate\Database\Eloquent\Model;
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
        Model::unguard();

        $this->call(BedroomTypeSeeder::class);
        $this->call(BuildingTypeSeeder::class);
        $this->call(RegionSeeder::class);
        $this->call(NeighborhoodSeeder::class);
        $this->call(SubwaySeeder::class);
        $this->call(AmenitiesSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(ConnectRelationshipsSeeder::class);
        $this->call(UsersTableSeeder::class);

        Model::reguard();
    }
}
