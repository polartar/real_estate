<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    //
    protected $casts = [
        "building_type_id" => "int",
        "bedroom_type_id" => "int",
        "rating" => "float",
        "available_date" => 'date:Y-m-d',
        "available_until" => 'date:Y-m-d',
        "due_to_reserve" => 'array',
        "due_by_checkin" => 'array'
    ];

    protected $appends = ['neighborhood_ids', 'map_marker_ids', 'monthly_utilities'];
    protected $hidden = ['neighborhoods', 'map_markers'];
    protected $with = ['amenities', 'subways', 'neighborhoods', 'map_markers', 'rates', 'images', 'floor_plans', 'block_dates'];


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

    function rates() {
        return $this->hasMany(MonthlyRate::class);
    }

    function owner() {
        return $this->belongsTo(User::class);
    }

    function images() {
        return $this->morphMany(ImageUpload::class, 'attachment')->where('name', '=', 'images');
    }

    function floor_plans() {
        return $this->morphMany(ImageUpload::class, 'attachment')->where('name', '=', 'floor_plans');
    }

    function block_dates() {
        return $this->hasMany(BlockDates::class);
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

    public function getMonthlyUtilitiesAttribute() {
        $utilities = [
            $this->attributes['utility_wifi'],
            $this->attributes['utility_cable'],
            $this->attributes['utility_electricity'],
            $this->attributes['utility_cleaning']
        ];

        $utilties = array_filter($utilities);

        return round(array_sum($utilities), 2);
    }

    /**
     * Custom methods
     */

     /**
      * Gets the current rate based on the current month and seasonal rates
      */
    public function getCurrentRate() {
        $date = Carbon::now();

        if ($this->available_date) {
            $date = $date->greaterThan($this->available_date) ? $date : $this->available_date;
        }

        $rate = $this->rates->firstWhere('month', $date->month);

        return $rate ? $rate->rate : null;
    }

    public function updateRate() {
        $new_rate = $this->getCurrentRate();

        if ($new_rate !== $this->rate) {
            $this->rate = $new_rate;
            $this->save();
        }
    }
}
