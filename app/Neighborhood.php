<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Neighborhood extends Model
{
    public $timestamps = false;

    //
    protected $casts = [
        'coordinates' => 'array'
    ];

    function region() {
        return $this->belongsTo(Region::class);
    }

    function apartments() {
        return $this->hasMany(Apartment::class);
    }
}
