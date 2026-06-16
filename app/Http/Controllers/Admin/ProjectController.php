<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects', [
            'projects' => Project::orderBy('order_index')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'tech_stack' => 'required|array',
            'status' => 'required|string|max:255',
            'is_active_deployment' => 'required|boolean',
            'my_role' => 'required|string|max:255',
            'problem_statement' => 'required|string',
            'solution_design' => 'required|string',
            'challenges_mitigation' => 'required|string',
            'architecture_overview' => 'required|string',
            'live_demo_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
            'order_index' => 'required|integer',
        ]);

        $project = new Project();
        $project->fill($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 's3');

            $project->image_preview_path = Storage::disk('s3')->url($path);
        }

        $project->save();

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'tagline' => 'required|string|max:255',
            'description' => 'required|string',
            'tech_stack' => 'required|array',
            'status' => 'required|string|max:255',
            'is_active_deployment' => 'required|boolean',
            'my_role' => 'required|string|max:255',
            'problem_statement' => 'required|string',
            'solution_design' => 'required|string',
            'challenges_mitigation' => 'required|string',
            'architecture_overview' => 'required|string',
            'live_demo_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
            'order_index' => 'required|integer',
        ]);

        $project->fill($validated);

        if ($request->hasFile('image')) {

            if ($project->image_preview_path) {

                $oldPath = parse_url(
                    $project->image_preview_path,
                    PHP_URL_PATH
                );

                if ($oldPath) {

                    $oldPath = preg_replace(
                        '#^/storage/v1/s3/public/portfolio/#',
                        '',
                        $oldPath
                    );

                    Storage::disk('s3')->delete($oldPath);
                }
            }

            $path = $request->file('image')->store(
                'projects',
                's3'
            );

            $project->image_preview_path = Storage::disk('s3')->url($path);
        }

        $project->save();

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image_preview_path) {

    $oldPath = parse_url(
        $project->image_preview_path,
        PHP_URL_PATH
    );

    if ($oldPath) {

        $oldPath = preg_replace(
            '#^/storage/v1/s3/public/portfolio/#',
            '',
            $oldPath
        );

        Storage::disk('s3')->delete($oldPath);
    }
}
        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
