<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BedroomType extends Model
{
    /**
     * @param $name
     * @return BedroomType
     */
    static function findByName($name) {
        return static::query()->where("name", $name)->first();
    }
}
