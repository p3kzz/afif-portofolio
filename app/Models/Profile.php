<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name',
        'title',
        'tagline',
        'short_introduction',
        'typing_effects',
        'cv_file_path',
        'avatar_path',
        'email',
        'phone',
        'github_url',
        'linkedin_url',
        'instagram_url'
    ];


    protected $casts = [
        'typing_effects' => 'array',
    ];
}
