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

            $lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis pellentesque scelerisque. Ut nec leo nunc. Duis eu erat ac libero ultricies congue. Donec sit amet tempor magna. Pellentesque ut odio eget tortor suscipit ornare. In nec maximus sem. Maecenas egestas arcu ut urna eleifend, nec dapibus quam iaculis. Maecenas eget condimentum quam, et luctus odio. Curabitur et quam et augue bibendum elementum sodales non ante. Nunc sed sodales purus. Donec quis erat nulla. Etiam congue libero euismod, efficitur nibh quis, mattis est. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.';

            $neighborhood = Neighborhood::create([
                'name' => $n->name,
                'description' => property_exists($n, 'description') ? $n->description : $lipsum,
                'slug' => Str::slug($n->slug),
                'region_id' => $region->id,
                'perimeter_coordinates' => json_encode($n->coordinates),
                'image' => $n->image
            ]);

            return $neighborhood;
        }, $neighborhoods));
    }
}
