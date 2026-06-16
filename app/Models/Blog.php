<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'slug', 'excerpt', 'content', 'cover_image_path', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
