<?php

use App\Neighborhood;
use App\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NeighborhoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $neighborhoods = json_decode(file_get_contents(base_path('database/assets/neighborhoods.json')));
        $regions = Region::all();

        collect(array_map(function($n) use ($regions) {
            $region = $regions->filter(function($r) use ($n) {
                return $r->import_id === $n->region_id;
            })->first();

            $neighborhood = Neighborhood::create([
                'name' => $n->name,
                'slug' => Str::slug($n->slug),
                'region_id' => $region->id,
                'perimeter_coordinates' => json_encode($n->coordinates)
            ]);

            return $neighborhood;
        }, $neighborhoods));
    }
}
