<?php

use App\Amenity;
use Illuminate\Database\Seeder;

class AmenitiesSeeder extends Seeder
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
                'name' => 'Pet Friendly',
                'icon' => '/assets/images/amenities/pets.svg'
            ],
            [
                'name' => 'Laundry',
                'icon' => '/assets/images/amenities/laundry.svg'
            ],
            [
                'name' => 'Gym',
                'icon' => '/assets/images/amenities/gym.svg'
            ],
            [
                'name' => 'Pool',
                'icon' => '/assets/images/amenities/dishwasher.svg'
            ],
            [
                'name' => 'Microwave Oven',
                'icon' => '/assets/images/amenities/microwave.png'
            ],
            [
                'name' => 'Fridge',
                'icon' => '/assets/images/amenities/fridge.png'
            ],
            [
                'name' => 'Sheets & Towels',
                'icon' => '/assets/images/amenities/sheets_towels.svg'
            ],
            [
                'name' => 'Monthly Cleaning',
                'icon' => '/assets/images/amenities/monthly_cleaning.svg'
            ],
            [
                'name' => 'No Smoking',
                'icon' => '/assets/images/amenities/no_smoking.svg'
            ],
            [
                'name' => 'Wifi',
                'icon' => '/assets/images/amenities/wifi.png'
            ],
            [
                'name' => 'Cable',
                'icon' => '/assets/images/amenities/cable.png'
            ],
            [
                'name' => 'TV',
                'icon' => '/assets/images/amenities/cable.png'
            ],
            [
                'name' => 'AC',
                'icon' => '/assets/images/amenities/ac.png'
            ],
            [
                'name' => 'Heating',
                'icon' => '/assets/images/amenities/cable.png'
            ]
        ])
        ->each(function($amenity) {
            Amenity::create([
                'name' => $amenity['name'],
                'icon' => $amenity['icon']
            ]);
        });
    }
}
