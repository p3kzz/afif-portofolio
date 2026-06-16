<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['content', 'author_name', 'author_role', 'avatar_path'];
}
