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

    $possible_images = [];
    for ($i = 0; $i < 10; $i++) {
        $possible_images[] = 'https://picsum.photos/seed/' . $i . '/400/300.jpg';
    }

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

    $floor_plan_num = 0;
    $floor_plan_check = random_int(0, 100);

    if ($floor_plan_check > 20) {
        $floor_plan_num = 1;
    }

    if ($floor_plan_check > 70) {
        $floor_plan_check = 2;
    }

    if ($floor_plan_check > 90) {
        $floor_plan_num = 3;
    }

    $videos = ['https://www.youtube.com/watch?v=C0DPdy98e4c', 'https://www.youtube.com/watch?v=Bey4XXJAqS8', 'https://www.youtube.com/watch?v=HmZKgaHa3Fg'];

    $listing = [
        'user_id' => 1,
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
        'rating' => $faker->numberBetween(1, 5),
        'video_url' => random_int(0, 100) > 20 ? $faker->randomElement($videos) : null,
        'images' => $faker->randomElements($possible_images, random_int(0, 10)),
        'floor_plans' => $faker->randomElements($possible_images, $floor_plan_num),
        'lat' => $lat,
        'lng' => $lng,
        'title' => $faker->sentence(),
        'description' => $faker->paragraph($faker->numberBetween(3, 8)),
        'is_active' => $faker->numberBetween(1, 100) > 15, // 85% active
        'faked' => true
    ];

    return $listing;
});
