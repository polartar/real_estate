<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subway extends Model
{
    public $timestamps = false;

    //
    function apartments() {
        return $this->belongsToMany(Apartment::class);
    }
}
