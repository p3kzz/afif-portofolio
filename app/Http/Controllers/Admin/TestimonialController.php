<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => Testimonial::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'author_name' => 'required|string|max:255',
            'author_role' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $testimonial = new Testimonial();
        $testimonial->content = $validated['content'];
        $testimonial->author_name = $validated['author_name'];
        $testimonial->author_role = $validated['author_role'];

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $testimonial->avatar_path = '/storage/' . $path;
        }

        $testimonial->save();

        return redirect()->back()->with('success', 'Testimonial added successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'author_name' => 'required|string|max:255',
            'author_role' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $testimonial->content = $validated['content'];
        $testimonial->author_name = $validated['author_name'];
        $testimonial->author_role = $validated['author_role'];

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar_path) {
                $oldPath = str_replace('/storage/', '', $testimonial->avatar_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('avatar')->store('testimonials', 'public');
            $testimonial->avatar_path = '/storage/' . $path;
        }

        $testimonial->save();

        return redirect()->back()->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar_path) {
            $oldPath = str_replace('/storage/', '', $testimonial->avatar_path);
            Storage::disk('public')->delete($oldPath);
        }
        $testimonial->delete();

        return redirect()->back()->with('success', 'Testimonial deleted successfully.');
    }
}
