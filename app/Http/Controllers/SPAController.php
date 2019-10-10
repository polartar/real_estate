<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SPAController extends Controller
{
    public function serve() {
        $contents = file_get_contents(public_path('index.html'));

        // $contents = str_replace('{{ csrf_token() }}', csrf_token(), $contents);
        return response($contents);
    }
}
