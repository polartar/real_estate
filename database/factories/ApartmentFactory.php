<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Apartment;
use App\BuildingType;
use App\BedroomType;
use App\Neighborhood;
use Faker\Generator as Faker;

$factory->define(Apartment::class, function (Faker $faker, $params) {

    $bedroomType = BedroomType::orderByRaw('RAND()')->first();
    $buildingType = BuildingType::orderByRaw('RAND()')->first();

    $latlngPairs = [
        [
            'lat' => [
                'min' => 40.701544,
                'max' => 40.879336
            ],
            'lng' => [
                'min' => -73.972988,
                'max' => -73.904001
            ]
        ]
    ];

    $neighborhoods = Neighborhood::all();
    $neighborhood_point_found = false;

    while (!$neighborhood_point_found) {
        $latlngPair = $faker->randomElement($latlngPairs);

        $lat = $faker->latitude($latlngPair['lat']['min'], $latlngPair['lat']['max']);
        $lng = $faker->longitude($latlngPair['lng']['min'], $latlngPair['lng']['max']);

        foreach ($neighborhoods as $n) {
            if ($n->containsPoint($lng, $lat)) {
                $neighborhood_point_found = true;

                break;
            }
        }
    }

    $videos = ['https://www.youtube.com/watch?v=C0DPdy98e4c', 'https://www.youtube.com/watch?v=Bey4XXJAqS8', 'https://www.youtube.com/watch?v=HmZKgaHa3Fg'];

    $listing = [
        'user_id' => 1,
        'owner_name' => $faker->name(),
        'address' => $faker->address,
        'street_address' => $faker->streetAddress,
        'zip' => $faker->postcode,
        'city' => $faker->city,
        'state' => $faker->state,
        'apartment_number' => $faker->secondaryAddress,
        'size' => $faker->numberBetween(900, 4000),
        'bedroom_type_id' => $bedroomType->id,
        'building_type_id' => $buildingType->id,
        'bathrooms' => $faker->randomElement([1,1.5,2,2.5,3,3.5,4]),
        'cross_streets' => $faker->streetName,
        'floor' => random_int(0, 100) > 30 ? $faker->numberBetween(1, 15) : '',
        'available_date' => $faker->dateTimeBetween('now', '+6 months'),
        'available_until' => $faker->dateTimeBetween('+6 months', '+12 months'),
        'rate' => $faker->randomFloat(2, 1000, 15000),
        'utility_cable' => $faker->randomFloat(2, 0, 200),
        'utility_wifi' => $faker->randomFloat(2, 0, 200),
        'utility_electricity' => $faker->randomFloat(2, 0, 200),
        'utility_cleaning' => $faker->randomFloat(2, 0, 200),
        'move_out_fee' => $faker->randomFloat(2, 0, 500),
        'rating' => $faker->numberBetween(1, 5),
        'video_url' => random_int(0, 100) > 20 ? $faker->randomElement($videos) : null,
        'lat' => $lat,
        'lng' => $lng,
        'title' => $faker->sentence(),
        'description' => $faker->paragraph($faker->numberBetween(3, 8)),
        'is_active' => 1, // $faker->numberBetween(1, 100) > 15, // 85% active
        'faked' => true
    ];

    return $listing;
});
