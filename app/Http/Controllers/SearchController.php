<?php

namespace App\Http\Controllers;

use App\Providers\SearchServiceProvider;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //
    public function named($name) {
        $results = SearchServiceProvider::getNamedSearch($name);

        return $results;
    }
}
