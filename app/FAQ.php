<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    public $timestamps = false;

    protected $fillable = ['question', 'answer', 'category', 'role'];

    protected $table = 'faq';
}
