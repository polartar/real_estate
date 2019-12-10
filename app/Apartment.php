<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
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
        "images" => 'array',
        'floor_plans' => 'array'
    ];

    protected $appends = ['neighborhood_ids', 'map_marker_ids'];
    protected $hidden = ['neighborhoods', 'map_markers'];
    protected $with = ['amenities', 'subways', 'neighborhoods', 'map_markers'];


    protected static function boot() {
        parent::boot();

        static::addGlobalScope('active', function(Builder $builder) {
            $builder->where('is_active', true);
        });
    }

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

    function map_markers() {
        return $this->belongsToMany(MapMarker::class);
    }

    function subways() {
        return $this->belongsToMany(Subway::class);
    }

    function amenities() {
        return $this->belongsToMany(Amenity::class);
    }

    // accessors

    /**
     * Get the neighborhood ids
     */
    public function getNeighborhoodIdsAttribute() {
        return $this->neighborhoods->pluck('id');
    }

    public function getMapMarkerIdsAttribute() {
        return $this->map_markers->pluck('id');
    }
}
