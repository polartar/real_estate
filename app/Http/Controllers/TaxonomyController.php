<?php

namespace App\Http\Controllers;

use App\Amenity;
use App\BedroomType;
use App\BuildingType;
use App\Neighborhood;
use App\Region;
use App\Subway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TaxonomyController extends Controller
{
    //
    public function taxonomy() {
        $taxonomy = Cache::remember('taxonomy', 600, function() {
            return [
                'neighborhoods' => Neighborhood::all(),
                'regions' => Region::all(),
                'building_types' => BuildingType::orderBy('id', 'asc')->get(),
                'bedroom_types' => BedroomType::all(),
                'subways' => Subway::all(),
                'amenities' => Amenity::orderBy('name', 'asc')->get()
            ];
        });

        return response()->json($taxonomy);
    }
}
