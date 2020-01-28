<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Apartment;
use App\MonthlyRate;
use App\Amenity;
use App\BlockDates;
use App\ImageUpload;
use App\Subway;

class ApartmentServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Assign uploaded images to the apartment
     * @param $apt: Apartment
     * @param $images: Array of ImageUpload ids
     * @param $name: string
     */
    public static function claimImages(Apartment $apt, $images, $name) {
        if ($images && is_array($images)) {
            foreach ($images as $imgID) {
                $img = ImageUpload::find($imgID);
                if ($img) {
                    $img->attachment_id = $apt->id;
                    $img->attachment_type = Apartment::class;
                    $img->name = $name;
                    $img->save();
                }
            }
        }
    }


    /**
     *
     *  Assign relationships for faked apts below
     *
     *
     */
    public static function assignFakeRates(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        // set a different rate per quarter
        $rate_q1 = random_int(1000, 15000);
        $rate_q2 = random_int(1000, 15000);
        $rate_q3 = random_int(1000, 15000);
        $rate_q4 = random_int(1000, 15000);

        $months = range(0, 11);
        $months[] = 'default';

        foreach($months as $month) {
            $rate = $rate_q4;
            if ($month < 10) {
                $rate = $rate_q3;
            }

            if ($month < 7) {
                $rate = $rate_q2;
            }

            if ($month < 4) {
                $rate = $rate_q1;
            }

            $deposit = random_int(0, 100);
            $svc_host = random_int(0, 20);
            $svc_client = random_int(0, 20);
            $background_check = random_int(0, 500);

            MonthlyRate::create([
                'apartment_id' => $apartment->id,
                'month' => $month,
                'monthly_rate' => $rate,
                'tax_percent' => random_int(0, 20),
                'security_deposit_percent' => $deposit,
                'service_fee_host' => $svc_host,
                'service_fee_client' => $svc_client,
                'background_check_rate' => $background_check
            ]);
        }
    }


    public static function assignFakedAmenities(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        $num = random_int(0, 32);
        if (!$num) {
            return;
        }

        $amenities = Amenity::inRandomOrder()->take($num)->get();

        $amenities->each(function ($amenity) use ($apartment) {
            $apartment->amenities()->attach($amenity);
        });
    }


    public static function assignFakedSubways(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        // only assign random subways to faked apartments
        $num = random_int(0, 7);
        if (!$num) {
            return;
        }

        $subways = Subway::whereRaw('RAND()')->take($num)->get();

        $subways->each(function ($subway) use ($apartment) {
            $apartment->subways()->attach($subway);
        });
    }

    public static function assignFakedImages(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        $images_num = random_int(1, 10);
        $floor_plans_num = random_int(0, 2);

        for ($i = 0; $i < $images_num; $i++) {
            factory(ImageUpload::class)->create([
                'name' => 'images',
                'user_id' => 1,
                'attachment_id' => $apartment->id,
                'attachment_type' => Apartment::class
            ]);
        }

        for ($i = 0; $i < $floor_plans_num; $i++) {
            factory(ImageUpload::class)->create([
                'name' => 'floor_plans',
                'user_id' => 1,
                'attachment_id' => $apartment->id,
                'attachment_type' => Apartment::class
            ]);
        }
    }

    public static function assignFakedBlockDates(Apartment $apartment) {
        if (!$apartment->faked) {
            return;
        }

        $num = random_int(0, 3);
        if ($num) {
            for ($i = 0; $i < $num; $i++) {
                factory(BlockDates::class)->create([
                    'apartment_id' => $apartment->id
                ]);
            }
        }
    }
}
