<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['time_period', 'company', 'title', 'description', 'type'];
}
