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
        "available_date" => 'date',
        "available_until" => 'date'
    ];

    /**
     * @return BelongsTo
     */
    function bedroom_type()
    {
        return $this->belongsTo(BedroomType::class);
    }

    function building_type()
    {
        return $this->belongsTo(BuildingType::class);
    }
}
