<?php

namespace App\Http\Controllers;

use App\Providers\SearchServiceProvider;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class SearchController extends Controller
{
    //
    public function named($name) {
        return SearchServiceProvider::getNamedSearch($name);
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
