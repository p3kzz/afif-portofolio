<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Blogs', [
            'blogs' => Blog::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $blog = new Blog();
        $blog->title = $validated['title'];
        $blog->excerpt = $validated['excerpt'];
        $blog->content = $validated['content'];
        $blog->is_published = $validated['is_published'];
        
        // Generate unique slug
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $blog->slug = $slug;

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('blogs', 'public');
            $blog->cover_image_path = '/storage/' . $path;
        }

        $blog->save();

        return redirect()->back()->with('success', 'Blog created successfully.');
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'nullable|string',
            'is_published' => 'required|boolean',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $blog->title = $validated['title'];
        $blog->excerpt = $validated['excerpt'];
        $blog->content = $validated['content'];
        $blog->is_published = $validated['is_published'];

        // Update slug if title changed
        if ($blog->isDirty('title')) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (Blog::where('slug', $slug)->where('id', '!=', $blog->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $blog->slug = $slug;
        }

        if ($request->hasFile('cover')) {
            if ($blog->cover_image_path) {
                $oldPath = str_replace('/storage/', '', $blog->cover_image_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('cover')->store('blogs', 'public');
            $blog->cover_image_path = '/storage/' . $path;
        }

        $blog->save();

        return redirect()->back()->with('success', 'Blog updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->cover_image_path) {
            $oldPath = str_replace('/storage/', '', $blog->cover_image_path);
            Storage::disk('public')->delete($oldPath);
        }
        $blog->delete();

        return redirect()->back()->with('success', 'Blog deleted successfully.');
    }
}
