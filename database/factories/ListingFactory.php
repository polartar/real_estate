<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Listing;
use Faker\Generator as Faker;

$factory->define(Listing::class, function (Faker $faker, $params) {
    $possible_neighborhoods = json_decode(file_get_contents(base_path('database/assets/neighborhoods.json')));
    $possible_neighborhoods = array_map(function($n) { return $n->id; }, $possible_neighborhoods);

    $possible_images = [];
    for ($i = 0; $i < 10; $i++) {
        $possible_images[] = 'https://picsum.photos/seed/' . $i . '/400/300.jpg';
    }

    $listing = [
        'streetAddress' => $faker->streetAddress,
        'address' => $faker->address,
        'zipcode' => $faker->postcode,
        'latitude' => $faker->latitude(40.721412, 40.723412),
        'longitude' => $faker->longitude(-73.994290, -73.996290),
        'price' => $faker->numberBetween(1000, 15000),
        'bedrooms' => $faker->randomElement(['room','studio',1,2,3,4,5]),
        'bathrooms' => $faker->randomElement([1,1.5,2,2.5,3,3.5,4]),
        'rating' => $faker->numberBetween(1, 5),
        'neighborhood_id' => $faker->randomElement($possible_neighborhoods),
        'building_type' => $faker->randomElement(['elevator', 'walkup', 'elevator-doorman']),
        'available_date' => date('m-d-Y', $faker->dateTimeInInterval('now', '+ 4 months')->getTimestamp()),
        'images' => $faker->randomElements($possible_images, random_int(0, 10))
    ];

    if ($params['faked']) {
        $listing['id'] = $faker->randomNumber();
    }

    return $listing;
});
