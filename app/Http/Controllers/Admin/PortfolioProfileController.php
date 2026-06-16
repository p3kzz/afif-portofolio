<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutCard;
use App\Models\Profile;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/PortfolioProfile', [
            'profile' => Profile::first(),
            'statistics' => Statistic::orderBy('order_index')->get(),
            'aboutCards' => AboutCard::orderBy('order_index')->get(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'tagline' => 'required|string|max:255',
            'short_introduction' => 'required|string',
            'typing_effects' => 'required|array',
            'cv_file' => 'nullable|file|mimes:pdf|max:10240',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
            'email' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'instagram_url' => 'nullable|string|max:255',
        ]);

        $profile->name = $validated['name'];
        $profile->title = $validated['title'];
        $profile->tagline = $validated['tagline'];
        $profile->short_introduction = $validated['short_introduction'];
        $profile->typing_effects = $validated['typing_effects'];
        $profile->email = $validated['email'] ?? null;
        $profile->phone = $validated['phone'] ?? null;
        $profile->github_url = $validated['github_url'] ?? null;
        $profile->linkedin_url = $validated['linkedin_url'] ?? null;
        $profile->instagram_url = $validated['instagram_url'] ?? null;

        if ($request->hasFile('cv_file')) {

            $file = $request->file('cv_file');

            $fileName = time() . '_' . str_replace(
                ' ',
                '_',
                $file->getClientOriginalName()
            );

            $path = $file->storeAs(
                'profile',
                $fileName,
                's3'
            );

            $profile->cv_file_path = Storage::disk('s3')->url($path);
        }

        if ($request->hasFile('avatar')) {

            $path = $request->file('avatar')->store(
                'profile',
                's3'
            );
            dd($path);

            $profile->avatar_path = Storage::disk('s3')->url($path);
        }

        $profile->save();

        return redirect()->back()->with('success', 'Portfolio Profile updated successfully.');
    }

    public function storeStatistic(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer',
            'order_index' => 'required|integer',
        ]);

        Statistic::create($validated);

        return redirect()->back()->with('success', 'Statistic created successfully.');
    }

    public function updateStatistic(Request $request, Statistic $statistic)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer',
            'order_index' => 'required|integer',
        ]);

        $statistic->update($validated);

        return redirect()->back()->with('success', 'Statistic updated successfully.');
    }

    public function destroyStatistic(Statistic $statistic)
    {
        $statistic->delete();
        return redirect()->back()->with('success', 'Statistic deleted successfully.');
    }

    public function storeAboutCard(Request $request)
    {
        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'required|integer',
        ]);

        AboutCard::create($validated);

        return redirect()->back()->with('success', 'About Card created successfully.');
    }

    public function updateAboutCard(Request $request, AboutCard $aboutCard)
    {
        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order_index' => 'required|integer',
        ]);

        $aboutCard->update($validated);

        return redirect()->back()->with('success', 'About Card updated successfully.');
    }

    public function destroyAboutCard(AboutCard $aboutCard)
    {
        $aboutCard->delete();
        return redirect()->back()->with('success', 'About Card deleted successfully.');
    }
}
