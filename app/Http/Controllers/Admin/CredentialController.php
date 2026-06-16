<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CredentialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Credentials', [
            'experiences' => Experience::orderBy('created_at', 'desc')->get(),
            'certifications' => Certification::orderBy('year', 'desc')->get(),
        ]);
    }

    public function storeExperience(Request $request)
    {
        $validated = $request->validate([
            'time_period' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:professional,academic',
        ]);

        Experience::create($validated);

        return redirect()->back()->with('success', 'Experience added successfully.');
    }

    public function updateExperience(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'time_period' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:professional,academic',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Experience updated successfully.');
    }

    public function destroyExperience(Experience $experience)
    {
        $experience->delete();
        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }

    public function storeCertification(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'year' => 'required|integer',
            'credential_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $certification = new Certification();
        $certification->title = $validated['title'];
        $certification->issuer = $validated['issuer'];
        $certification->year = $validated['year'];
        $certification->credential_url = $validated['credential_url'];

        if ($request->hasFile('image')) {
    $path = $request->file('image')->store(
        'certifications',
        's3'
    );

    $certification->image_path =
        Storage::disk('s3')->url($path);
}

        $certification->save();

        return redirect()->back()->with('success', 'Certification created successfully.');
    }

    public function updateCertification(Request $request, Certification $certification)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'year' => 'required|integer',
            'credential_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:5120',
        ]);

        $certification->title = $validated['title'];
        $certification->issuer = $validated['issuer'];
        $certification->year = $validated['year'];
        $certification->credential_url = $validated['credential_url'];

        if ($request->hasFile('image')) {

    if ($certification->image_path) {

        $oldPath = parse_url(
            $certification->image_path,
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
        'certifications',
        's3'
    );

    $certification->image_path =
        Storage::disk('s3')->url($path);
}

        $certification->save();

        return redirect()->back()->with('success', 'Certification updated successfully.');
    }

    public function destroyCertification(Certification $certification)
    {
        if ($certification->image_path) {

    $oldPath = parse_url(
        $certification->image_path,
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
        $certification->delete();

        return redirect()->back()->with('success', 'Certification deleted successfully.');
    }
}
