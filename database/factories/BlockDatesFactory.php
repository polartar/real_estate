<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\BlockDates;
use Faker\Generator as Faker;

$factory->define(BlockDates::class, function (Faker $faker, $params) {
    return [
        'apartment_id' => $params['apartment_id'],
        'start' => $faker->dateTimeBetween('now', '+6 months'),
        'end' => $faker->dateTimeBetween('+6 months', '+12 months')
    ];
});
