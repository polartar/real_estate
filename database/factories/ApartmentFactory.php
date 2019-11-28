<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Apartment;
use App\BuildingType;
use App\BedroomType;
use Faker\Generator as Faker;

$factory->define(Apartment::class, function (Faker $faker, $params) {

    $bedroomType = BedroomType::orderByRaw('RAND()')->first();
    $buildingType = BuildingType::orderByRaw('RAND()')->first();

    $possible_images = [];
    for ($i = 0; $i < 10; $i++) {
        $possible_images[] = 'https://picsum.photos/seed/' . $i . '/400/300.jpg';
    }

    $latlngPairs = [
        [
            'lat' => [
                'min' => 40.711804,
                'max' => 40.753383
            ],
            'lng' => [
                'min' => -74.007956,
                'max' => -73.972988
            ]
        ],
        [
            'lat' => [
                'min' => 40.775855,
                'max' => 40.809058
            ],
            'lng' => [
                'min' => -73.968140,
                'max' => -73.942884
            ]
        ]
    ];

    $latlngPair = $faker->randomElement($latlngPairs);

    $listing = [
        'address' => $faker->address,
        'street_address' => $faker->streetAddress,
        'zip' => $faker->postcode,
        'city' => $faker->city,
        'state' => $faker->state,
        'apartment_number' => $faker->secondaryAddress,
        'bedroom_type_id' => $bedroomType->id,
        'building_type_id' => $buildingType->id,
        'bathrooms' => $faker->randomElement([1,1.5,2,2.5,3,3.5,4]),
        'cross_streets' => $faker->streetName,
        'available_date' => $faker->dateTimeBetween('now', '+6 months'),
        'available_until' => $faker->dateTimeBetween('+6 months', '+12 months'),
        'rate' => $faker->numberBetween(1000, 15000),
        'rating' => $faker->numberBetween(1, 5),
        'images' => json_encode($faker->randomElements($possible_images, random_int(0, 10))),
        'lat' => $faker->latitude($latlngPair['lat']['min'], $latlngPair['lat']['max']),
        'lng' => $faker->longitude($latlngPair['lng']['min'], $latlngPair['lng']['max']),
        'is_active' => true,
    ];

    return $listing;
});
