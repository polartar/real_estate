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
        factory(\App\Apartment::class, 1)->create(['faked' => true]);
    }
}
