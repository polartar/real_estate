<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonthlyRate extends Model
{
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
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }

    /**
     * Custom methods
     */
    public function updateApartmentRate() {
        $this->apartment->updateRate();
    }
}
