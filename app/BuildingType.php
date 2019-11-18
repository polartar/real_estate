<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BuildingType extends Model
{
    /**
     * @param $name
     * @return BuildingType
     */
    static function findByName($name) {
        return static::query()->where("name", $name)->first();
    }
}
