<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Apartment;
use App\BuildingType;
use App\BedroomType;
use Faker\Generator as Faker;

$factory->define(Apartment::class, function (Faker $faker, $params) {
    $possible_neighborhoods = json_decode(file_get_contents(base_path('database/assets/neighborhoods.json')));
    $possible_neighborhoods = array_map(function($n) { return $n->id; }, $possible_neighborhoods);

    $bedroomType = BedroomType::orderByRaw('RAND()')->first();
    $buildintType = BuildingType::orderByRaw('RAND()')->first();

    $possible_images = [];
    for ($i = 0; $i < 10; $i++) {
        $possible_images[] = 'https://picsum.photos/seed/' . $i . '/400/300.jpg';
    }

    $neighborhood_num = random_int(0, 100) < 80 ? 1 : 2;

    $listing = [
        'streetAddress' => $faker->streetAddress,
        'address' => $faker->address,
        'zipcode' => $faker->postcode,
        'latitude' => $faker->latitude(40.720412, 40.725412),
        'longitude' => $faker->longitude(-73.992290, -73.998290),
        'price' => $faker->numberBetween(1000, 15000),
        'bedroom_type_id' => $bedroomType->id,
        'building_type_id' => $buildintType->id,
        // 'bedrooms' => $faker->randomElement(['room','studio',1,2,3,4,5]),
        // 'bathrooms' => $faker->randomElement([1,1.5,2,2.5,3,3.5,4]),
        'rating' => $faker->numberBetween(1, 5),
        'neighborhood_id' => $faker->randomElements($possible_neighborhoods, $neighborhood_num),
        'building_type' => $faker->randomElement(['elevator', 'walkup', 'elevator-doorman']),
        'available_date' => date('m-d-Y', $faker->dateTimeInInterval('now', '+ 4 months')->getTimestamp()),
        'images' => $faker->randomElements($possible_images, random_int(0, 10))
    ];

    if ($params['faked']) {
        $listing['id'] = $faker->randomNumber();
    }

    return $listing;
});
