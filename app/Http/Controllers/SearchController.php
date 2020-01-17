<?php

namespace App\Http\Controllers;

use App\Neighborhood;
use App\Providers\SearchServiceProvider;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class SearchController extends Controller
{
    //
    public function named($name) {
        $params_json = request()->params;

        $params = json_decode($params_json, true);

        return SearchServiceProvider::getNamedSearch($name, $params);
    }

    public function search() {
        $params = request()->params;

        $filters = json_decode($params, true);

        return SearchServiceProvider::search($filters);
    }

    public function mapMarkers() {
        $params_json = request()->params;

        $params = json_decode($params_json, true);

        return SearchServiceProvider::searchMapMarkers($params);
    }
}
