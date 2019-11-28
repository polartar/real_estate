<?php

namespace App\Http\Controllers;

use App\Providers\SearchServiceProvider;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class SearchController extends Controller
{
    //
    public function named($name) {
        $results = SearchServiceProvider::getNamedSearch($name);

        return $results;
    }

    public function search() {
        $params = request()->params;

        $filters = json_decode($params, true);

        $results = SearchServiceProvider::search($filters);

        return $results;
    }
}
