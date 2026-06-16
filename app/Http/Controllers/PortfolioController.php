<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Statistic;
use App\Models\AboutCard;
use App\Models\SkillCategory;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Certification;
use App\Models\Blog;
use App\Models\Testimonial;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Render halaman utama portofolio dengan data ter-inject penuh.
     */
    public function index(): Response
    {
        return Inertia::render('Portofolio/index', [
            'profile' => Profile::first(),
            'statistics' => Statistic::orderBy('order_index')->get(),
            'aboutCards' => AboutCard::orderBy('order_index')->get(),
            'skillCategories' => SkillCategory::with('skills')->orderBy('order_index')->get(),
            'projects' => Project::orderBy('order_index')->get(),
            'experiences' => Experience::where('type', 'professional')->orderBy('created_at', 'desc')->get(),
            'educations' => Experience::where('type', 'academic')->orderBy('id', 'asc')->get(),
            'certifications' => Certification::orderBy('year', 'desc')->get(),
            'blogs' => Blog::where('is_published', true)->orderBy('created_at', 'desc')->get(),
            'testimonials' => Testimonial::all(),
            'approvedComments' => Comment::where('is_approved', true)->orderBy('created_at', 'desc')->get(),
            'auth_user' => Auth::user(), // Berguna jika pengunjung sudah login via Breeze
        ]);
    }

    /**
     * Handler untuk menyimpan feedback/komentar dari Visitor Ledger Form.
     */
    public function storeComment(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'comment' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Comment::create([
            'user_id' => Auth::id(), // null jika anonim (guest)
            'name' => $validated['name'],
            'comment' => $validated['comment'],
            'rating' => $validated['rating'],
            'is_approved' => false, // Harus di-approve admin via CMS nanti agar aman dari spam
        ]);

        return redirect()->back()->with('success', 'Comment submitted successfully! Waiting for admin approval.');
    }

    /**
     * Handler untuk mengunduh CV dengan nama yang rapi/bersih.
     */
    public function downloadCv()
    {
        $profile = Profile::first();
        if ($profile && $profile->cv_file_path) {

            // Jika path adalah URL S3/Supabase (dimulai dengan http/https)
            if (filter_var($profile->cv_file_path, FILTER_VALIDATE_URL)) {
                $urlPath = parse_url($profile->cv_file_path, PHP_URL_PATH);
                // Hapus prefix bucket (seperti /storage/v1/object/public/bucket/ atau /storage/v1/s3/bucket/)
                $s3Path = preg_replace('#^/storage/v1/(object/public|s3)/[^/]+/#', '', $urlPath);

                try {
                    if (Storage::disk('s3')->exists($s3Path)) {
                        $ext = pathinfo($s3Path, PATHINFO_EXTENSION);
                        $downloadName = ($profile->name ? str_replace(' ', '_', $profile->name) : 'CV') . '_Resume.' . $ext;

                        return response()->streamDownload(function () use ($s3Path) {
                            $stream = Storage::disk('s3')->readStream($s3Path);
                            if ($stream) {
                                fpassthru($stream);
                                if (is_resource($stream)) {
                                    fclose($stream);
                                }
                            }
                        }, $downloadName, [
                            'Content-Type' => 'application/pdf',
                        ]);
                    }
                } catch (\Throwable $e) {
                    // Jika gagal stream via S3 client, alihkan langsung ke URL publiknya di browser
                    return redirect()->away($profile->cv_file_path);
                }

                // Jika file tidak ditemukan di S3, alihkan langsung ke URL publiknya
                return redirect()->away($profile->cv_file_path);
            }

            // Fallback untuk file lokal
            $relativePath = str_replace('/storage/', 'storage/', $profile->cv_file_path);
            $path = public_path($relativePath);

            if (file_exists($path)) {
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                $downloadName = ($profile->name ? str_replace(' ', '_', $profile->name) : 'CV') . '_Resume.' . $ext;
                return response()->download($path, $downloadName);
            }
        }
        return redirect()->back()->with('error', 'CV file not found.');
    }
}
