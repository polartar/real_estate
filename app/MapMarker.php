<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapMarker extends Model
{
    public $timestamps = false;

    //
    function apartments() {
        return $this->belongsToMany(Apartment::class);
    }
}
