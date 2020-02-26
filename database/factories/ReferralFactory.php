<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Referral;
use Faker\Generator as Faker;

$factory->define(Referral::class, function (Faker $faker) {
    return [
        'referrer_name' => $faker->name(),
        'referrer_email' => $faker->email,
        'referrer_phone' => $faker->phoneNumber,
        'referral_name' => $faker->name(),
        'referral_email' => $faker->email,
        'referral_phone' => $faker->phoneNumber
    ];
});
