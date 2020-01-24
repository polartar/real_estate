<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ImageUpload;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Storage;

$factory->define(ImageUpload::class, function (Faker $faker, $params) {
    Storage::disk('public')->makeDirectory('images-faked');

    $imagenum = $faker->numberBetween(1, 10);

    $filename = $faker->uuid() . '.jpg';
    $source = resource_path('images/faker/' . $imagenum . '.jpg');
    $target = Storage::disk('public')->path('images-faked/' . $filename);

    copy($source, $target);

    $thumbs = ImageUpload::createThumbnails($target, 'images-faked/');

    return [
        'name' => $params['name'],
        'user_id' => 1,
        'attachment_id' => $params['attachment_id'],
        'attachment_type' => $params['attachment_type'],
        'title' => $faker->sentence(8),
        'description' => $faker->paragraph($faker->numberBetween(3, 8)),
        'size_original' => 'images-faked/' . $filename,
        'size_small' => $thumbs['small'],
        'size_medium' => $thumbs['medium'],
        'size_large' => $thumbs['large']
    ];
});
