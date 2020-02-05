<?php

use App\Neighborhood;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $num_to_create = (int) env('APARTMENT_SEED_COUNT', 1000);

        factory(\App\Apartment::class, $num_to_create)->create(['faked' => true]);
    }
}
