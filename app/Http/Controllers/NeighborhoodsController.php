<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NeighborhoodsController extends Controller
{
    //
    public function taxonomy() {
        $taxonomy = Cache::remember('taxonomy', 600, function() {
            return [
                'neighborhoods' => json_decode(file_get_contents(base_path('database/assets/neighborhoods.json'))),
                'regions' => json_decode(file_get_contents(base_path('database/assets/regions.json'))),
            ];
        });

        return response()->json($taxonomy);
    }
}
