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
        $neighborhoods = Neighborhood::all();
        $apartments = factory(\App\Apartment::class, 100)->create(['faked' => true]);

        $apartments->each(function($a) use ($neighborhoods) {
            // attach to 1 or 2 neighborhoods
            $num = random_int(1, 10) === 10 ? 2 : 1; // 10% chance of 2 neighborhoods

            $ns = $neighborhoods->random($num);

            $ns->each(function($n) use ($a) {
                $a->neighborhoods()->attach($n);
            });
        });
    }
}
