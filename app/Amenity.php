<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    //
    public $timestamps = false;

    public function apartments() {
        return $this->belongsToMany(Apartment::class);
    }
}
