<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'tagline',
        'description',
        'tech_stack',
        'status',
        'is_active_deployment',
        'my_role',
        'problem_statement',
        'solution_design',
        'challenges_mitigation',
        'architecture_overview',
        'live_demo_url',
        'github_url',
        'image_preview_path',
        'order_index'
    ];

    // Mengubah string JSON tech_stack menjadi array murni di Frontend Inertia
    protected $casts = [
        'tech_stack' => 'array',
        'is_active_deployment' => 'boolean',
    ];
}
