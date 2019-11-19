<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Neighborhood extends Model
{
    public $timestamps = false;

    //
    protected $casts = [
        'perimeter_coordinates' => 'array'
    ];

    function region() {
        return $this->belongsTo(Region::class);
    }

    function apartments() {
        return $this->hasMany(Apartment::class);
    }

    public function getPerimeterCoordinatesAttribute($val) {
        return json_decode(json_decode($val)); // not sure why it's double-encoded;
    }
}
