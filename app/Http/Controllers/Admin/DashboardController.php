<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutCard;
use App\Models\Blog;
use App\Models\Certification;
use App\Models\Comment;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\Statistic;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'total_projects' => Project::count(),
                'pending_comments' => Comment::where('is_approved', false)->count(),
                'total_blogs' => Blog::count(),
                'total_skills' => Skill::count(),
            ],
            'recent_comments' => Comment::with('user')->orderBy('created_at', 'desc')->take(5)->get(),
            'recent_projects' => Project::orderBy('updated_at', 'desc')->take(3)->get(),
        ]);
    }
}
