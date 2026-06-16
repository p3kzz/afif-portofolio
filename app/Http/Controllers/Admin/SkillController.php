<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Skills', [
            'categories' => SkillCategory::with('skills')->orderBy('order_index')->get(),
        ]);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'required|integer',
        ]);

        SkillCategory::create($validated);

        return redirect()->back()->with('success', 'Skill category created successfully.');
    }

    public function updateCategory(Request $request, SkillCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order_index' => 'required|integer',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Skill category updated successfully.');
    }

    public function destroyCategory(SkillCategory $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Skill category deleted successfully.');
    }

    public function storeSkill(Request $request)
    {
        $validated = $request->validate([
            'skill_category_id' => 'required|exists:skill_categories,id',
            'name' => 'required|string|max:255',
            'proficiency_percentage' => 'nullable|integer|min:0|max:100',
            'is_featured_tag' => 'required|boolean',
        ]);

        Skill::create($validated);

        return redirect()->back()->with('success', 'Skill created successfully.');
    }

    public function destroySkill(Skill $skill)
    {
        $skill->delete();

        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
