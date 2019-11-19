<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BedroomType extends Model
{
    public $timestamps = false;

    /**
     * @param $name
     * @return BedroomType
     */
    static function findByName($name) {
        return static::query()->where("name", $name)->first();
    }
}
