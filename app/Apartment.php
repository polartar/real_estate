<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    //
    protected $casts = [
        "building_type_id" => "int",
        "bedroom_type_id" => "int",
        "rating" => "float",
        "advance_charges" => "array",
        "available_date" => 'date:Y-m-d',
        "available_until" => 'date:Y-m-d',
        "images" => 'array'
    ];

    protected $appends = ['neighborhood_ids'];
    protected $hidden = ['neighborhoods'];

    // relationships

    /**
     * @return BelongsTo
     */
    function bedroom_type() {
        return $this->belongsTo(BedroomType::class);
    }

    function building_type() {
        return $this->belongsTo(BuildingType::class);
    }

    function neighborhoods() {
        return $this->belongsToMany(Neighborhood::class);
    }

    // accessors

    /**
     * Get the neighborhood ids
     */
    // @TODO - this also sends all the neighborhood data
    // strip that from the json
    public function getNeighborhoodIdsAttribute() {
        return $this->neighborhoods->pluck('id');
    }

    public function getImagesAttribute($val) {
        return json_decode(json_decode($val)); // not sure why it's double-encoded;
    }
}
