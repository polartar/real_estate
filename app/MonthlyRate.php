<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyRate extends Model
{
    protected $guarded = [];
    protected $appends = ['display_rate'];

    //
    protected static function boot() {
        parent::boot();

        MonthlyRate::created(function ($model) {
            $model->updateApartmentRate();
        });

        MonthlyRate::updated(function ($model) {
            $model->updateApartmentRate();
        });
    }

    // Relationships
    public function apartment() {
        return $this->belongsTo(Apartment::class, 'apartment_id')->withoutGlobalScope('active');
    }

    // custom attributes
    public function getDisplayRateAttribute() {
        //
        $fees_percent = $this->attributes['service_fee_client'] + $this->attributes['service_fee_host'];
        return round($this->attributes['monthly_rate'] * (1 + ($fees_percent / 100)), 2);
    }

    /**
     * Custom methods
     */
    public function updateApartmentRate() {
        $this->apartment->updateRate();
    }
}
