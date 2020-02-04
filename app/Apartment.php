<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $guarded = [];

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

    protected $attributes = [
        'is_active' => true
    ];

    protected $appends = ['neighborhood_ids', 'map_marker_ids', 'monthly_utilities'];
    protected $hidden = ['neighborhoods', 'map_markers'];
    protected $with = ['amenities', 'subways', 'neighborhoods', 'map_markers', 'rates', 'images', 'floor_plans', 'block_dates'];

    protected static $structure = [
        'id',
        'owner_name',
        'address',
        'city',
        'state',
        'zip',
        'cross_streets',
        'lat',
        'lng',
        'title',
        'description',
        'bedroom_type_id',
        'bathrooms',
        'building_type_id',
        'floor',
        'floors',
        'size',
        'available_date',
        'utility_cable',
        'utility_wifi',
        'utility_electricity',
        'utility_cleaning',
        'move_out_fee',
        'months_due_on_checkin',
        'days_due_on_checkin',
        'duci_advance_payment_days',
        'due_to_reserve',
        'due_by_checkin',
        'video_url',
        'is_active',
        'feature_1',
        'feature_2',
        'feature_3'
    ];


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
    public function setRates($rates) {
        foreach ($rates as $month => $rate) {
            if (!$rate) {
                continue;
            }

            $this->rates()->where('month', $month)->updateOrCreate([
                'month' => $month
            ],
            array_merge($rate, ['apartment_id' => $this->id])
            );
        }
    }

     /**
      * Gets the current rate based on the current month and seasonal rates
      */
    public function getCurrentRate() {
        $date = Carbon::now();

        if ($this->available_date) {
            $date = $date->greaterThan($this->available_date) ? $date : $this->available_date;
        }

        // Note: rate month numbers stored in js format, starting from jan = 0
        // subtract 1 from Carbon month num
        $rate = $this->rates->firstWhere('month', $date->month - 1);

        return $rate ? $rate->display_rate : null;
    }

    public function updateRate() {
        $new_rate = $this->getCurrentRate();

        if ($new_rate !== $this->rate) {
            $this->rate = $new_rate;
            $this->save();
        }
    }

    public static function extractAptAttributes($array) {
        $result = [];
        foreach (self::$structure as $key) {
            if (isset($array[$key])) {
                $result[$key] = $array[$key];

                if ($key === 'available_date') {
                    $result[$key] = new Carbon($array[$key]);
                }
            }
        }

        return $result;
    }
}
