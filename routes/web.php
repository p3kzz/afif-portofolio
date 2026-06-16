<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');
Route::get('/download-cv', [PortfolioController::class, 'downloadCv'])->name('portfolio.download-cv');
Route::post('/comments', [PortfolioController::class, 'storeComment'])->name('portfolio.comment.store');
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/s3-test', function () {

    try {

        Storage::disk('s3')->put(
            'test.txt',
            'hello world'
        );

        return 'UPLOAD SUCCESS';

    } catch (\Throwable $e) {

        return $e->getMessage();

    }

});
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', \App\Http\Controllers\Admin\DashboardController::class)->name('dashboard');

    // Portfolio Profile routes (Profile, Stats, About Cards)
    Route::get('/portfolio-profile', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'index'])->name('profile.index');
    Route::post('/portfolio-profile', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'updateProfile'])->name('profile.update');
    Route::post('/portfolio-profile/stats', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'storeStatistic'])->name('profile.stats.store');
    Route::put('/portfolio-profile/stats/{statistic}', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'updateStatistic'])->name('profile.stats.update');
    Route::delete('/portfolio-profile/stats/{statistic}', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'destroyStatistic'])->name('profile.stats.destroy');
    Route::post('/portfolio-profile/about', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'storeAboutCard'])->name('profile.about.store');
    Route::put('/portfolio-profile/about/{aboutCard}', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'updateAboutCard'])->name('profile.about.update');
    Route::delete('/portfolio-profile/about/{aboutCard}', [\App\Http\Controllers\Admin\PortfolioProfileController::class, 'destroyAboutCard'])->name('profile.about.destroy');

    // Projects CRUD
    Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class)->except(['create', 'edit', 'show']);
    Route::post('projects/{project}', [\App\Http\Controllers\Admin\ProjectController::class, 'update'])->name('projects.update.post'); // POST route for uploads in multipart updates

    // Skills & Categories CRUD
    Route::get('/skills', [\App\Http\Controllers\Admin\SkillController::class, 'index'])->name('skills.index');
    Route::post('/skills/categories', [\App\Http\Controllers\Admin\SkillController::class, 'storeCategory'])->name('skills.categories.store');
    Route::put('/skills/categories/{category}', [\App\Http\Controllers\Admin\SkillController::class, 'updateCategory'])->name('skills.categories.update');
    Route::delete('/skills/categories/{category}', [\App\Http\Controllers\Admin\SkillController::class, 'destroyCategory'])->name('skills.categories.destroy');
    Route::post('/skills', [\App\Http\Controllers\Admin\SkillController::class, 'storeSkill'])->name('skills.store');
    Route::delete('/skills/{skill}', [\App\Http\Controllers\Admin\SkillController::class, 'destroySkill'])->name('skills.destroy');

    // Credentials & Experience routes
    Route::get('/credentials', [\App\Http\Controllers\Admin\CredentialController::class, 'index'])->name('credentials.index');
    Route::post('/credentials/experiences', [\App\Http\Controllers\Admin\CredentialController::class, 'storeExperience'])->name('credentials.experiences.store');
    Route::put('/credentials/experiences/{experience}', [\App\Http\Controllers\Admin\CredentialController::class, 'updateExperience'])->name('credentials.experiences.update');
    Route::delete('/credentials/experiences/{experience}', [\App\Http\Controllers\Admin\CredentialController::class, 'destroyExperience'])->name('credentials.experiences.destroy');
    Route::post('/credentials/certifications', [\App\Http\Controllers\Admin\CredentialController::class, 'storeCertification'])->name('credentials.certifications.store');
    Route::post('/credentials/certifications/{certification}', [\App\Http\Controllers\Admin\CredentialController::class, 'updateCertification'])->name('credentials.certifications.update'); // POST to support file uploads in Laravel multipart/form-data
    Route::delete('/credentials/certifications/{certification}', [\App\Http\Controllers\Admin\CredentialController::class, 'destroyCertification'])->name('credentials.certifications.destroy');

    // Blogs CRUD
    Route::resource('blogs', \App\Http\Controllers\Admin\BlogController::class)->except(['create', 'edit', 'show']);
    Route::post('blogs/{blog}', [\App\Http\Controllers\Admin\BlogController::class, 'update'])->name('blogs.update.post'); // POST update route for file upload handling

    // Comments Moderation
    Route::get('/comments', [\App\Http\Controllers\Admin\CommentController::class, 'index'])->name('comments.index');
    Route::put('/comments/{comment}/toggle-approve', [\App\Http\Controllers\Admin\CommentController::class, 'toggleApprove'])->name('comments.toggle-approve');
    Route::delete('/comments/{comment}', [\App\Http\Controllers\Admin\CommentController::class, 'destroy'])->name('comments.destroy');

    // Testimonials CRUD
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->except(['create', 'edit', 'show']);
    Route::post('testimonials/{testimonial}', [\App\Http\Controllers\Admin\TestimonialController::class, 'update'])->name('testimonials.update.post'); // POST update route for file upload handling

    // Account Credentials Settings
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');
});

require __DIR__ . '/auth.php';
