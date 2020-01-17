<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $regions = json_decode(file_get_contents(base_path('database/assets/regions.json')));

        collect(array_map(function($r) {

            $region = Region::updateOrCreate([
                'name' => $r->name,
                'import_id' => $r->id
            ]);

            return $region;
        }, $regions));
    }
}
