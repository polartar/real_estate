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
                'icon' => '/assets/images/amenities/pool.svg'
            ],
            [
                'name' => 'Microwave',
                'icon' => '/assets/images/amenities/microwave.svg'
            ],
            [
                'name' => 'Fridge',
                'icon' => '/assets/images/amenities/fridge.svg'
            ],
            [
                'name' => 'Bedding & Towel',
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
                'icon' => '/assets/images/amenities/wifi.svg'
            ],
            [
                'name' => 'Cable',
                'icon' => '/assets/images/amenities/cable.svg'
            ],
            [
                'name' => 'TV',
                'icon' => '/assets/images/amenities/tv.svg'
            ],
            [
                'name' => 'AC',
                'icon' => '/assets/images/amenities/ac.svg'
            ],
            [
                'name' => 'Heating',
                'icon' => '/assets/images/amenities/heating.svg'
            ],
            [
                'name' => 'Washing Machine',
                'icon' => '/assets/images/amenities/washing_machine.svg'
            ],
            [
                'name' => 'TV Room',
                'icon' => '/assets/images/amenities/tv_room.svg'
            ],
            [
                'name' => 'Stove',
                'icon' => '/assets/images/amenities/stove.svg'
            ],
            [
                'name' => 'Stocked Kitchen',
                'icon' => '/assets/images/amenities/stocked_kitchen.svg'
            ],
            [
                'name' => 'Safe',
                'icon' => '/assets/images/amenities/safe.svg'
            ],
            [
                'name' => 'Roof Deck',
                'icon' => '/assets/images/amenities/roof_deck.svg'
            ],
            [
                'name' => 'Private Terrace',
                'icon' => '/assets/images/amenities/private_terrace.svg'
            ],
            [
                'name' => 'Parking',
                'icon' => '/assets/images/amenities/parking.svg'
            ],
            [
                'name' => 'Mini Bar',
                'icon' => '/assets/images/amenities/mini_bar.svg'
            ],
            [
                'name' => 'Luxury Toiletries',
                'icon' => '/assets/images/amenities/luxury_toiletries.svg'
            ],
            [
                'name' => 'Iron',
                'icon' => '/assets/images/amenities/iron.svg'
            ],
            [
                'name' => 'Hair Dryer',
                'icon' => '/assets/images/amenities/hair_dryer.svg'
            ],
            [
                'name' => 'Guest Lounge',
                'icon' => '/assets/images/amenities/guest_lounge.svg'
            ],
            [
                'name' => 'Fire Place',
                'icon' => '/assets/images/amenities/fire_place.svg'
            ],
            [
                'name' => 'Elevator',
                'icon' => '/assets/images/amenities/elevator.svg'
            ],
            [
                'name' => 'Doorman',
                'icon' => '/assets/images/amenities/doorman.svg'
            ],
            [
                'name' => 'Coffee Machine',
                'icon' => '/assets/images/amenities/coffee_machine.svg'
            ],
            [
                'name' => 'Barbeque Grill',
                'icon' => '/assets/images/amenities/bbq.svg'
            ],
            [
                'name' => 'Dishwasher',
                'icon' => '/assets/images/amenities/dishwasher.svg'
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
