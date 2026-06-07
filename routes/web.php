<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Immo\Central\Agency\AgencyController;
use App\Http\Controllers\Immo\Central\Pages\About\AboutController;
use App\Http\Controllers\Immo\Central\Pages\Blog\BlogController;
use App\Http\Controllers\Immo\Central\Pages\Contact\ContactController;
use App\Http\Controllers\Immo\Central\Pages\Cookie\CookieController;
use App\Http\Controllers\Immo\Central\Pages\Faq\FaqController;
use App\Http\Controllers\Immo\Central\Pages\Help\HelpController;
use App\Http\Controllers\Immo\Central\Pages\Home\HeroController;
use App\Http\Controllers\Immo\Central\Pages\Privacy\PrivacyController;
use App\Http\Controllers\Immo\Central\Pages\Support\SupportController;
use App\Http\Controllers\Immo\Central\Pages\Term\TermController;
use App\Http\Controllers\Immo\Central\Pages\Testimonials\TestimonialController;
use App\Http\Controllers\Immo\Central\Property\PropertyController;
use App\Http\Controllers\Immo\Central\User\UserActionController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [HeroController::class, 'Index'])->name('home');

/*
|--------------------------------------------------------------------------
| ROUTES PROPRIETES & AGENCES
|--------------------------------------------------------------------------
*/
Route::prefix('properties')->name('properties.')->group(function () {
    Route::get('/', [PropertyController::class, 'index'])->name('index');
    Route::get('/{property:slug}', [PropertyController::class, 'show'])->name('show');
    Route::post('/properties/{property}/contact', [PropertyController::class, 'contact'])->name('contact');
    Route::middleware('auth')->group(function () {
        Route::post('/{property}/favorite', [UserActionController::class, 'toggleFavorite'])->name('favorite');
        Route::post('/{property}/visit', [UserActionController::class, 'requestVisit'])->name('visit');
    });
});

Route::prefix('agencies')->name('agencies.')->group(function () {
    Route::get('/', [AgencyController::class, 'index'])->name('index');
    Route::get('/{agency:slug}', [AgencyController::class, 'show'])->name('show');
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

/*
|--------------------------------------------------------------------------
| ROUTES BLOG PUBLIQUES
|--------------------------------------------------------------------------
*/
Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'blogIndex'])->name('blog.index');
    Route::get('/category/{category:slug}', [BlogController::class, 'blogByCategory'])->name('blog.category');
    Route::get('/{post:slug}', [BlogController::class, 'blogShow'])->name('blog.show');
    Route::post('/{post}/comment', [BlogController::class, 'blogComment'])->middleware('auth')->name('blog.comment');
    Route::post('/{post}/like', [BlogController::class, 'blogLike'])->middleware('auth')->name('blog.like');
});

Route::name('page.')->group(function () {
    Route::get('/contact', [ContactController::class, 'contactIndex'])->name('contact');
    Route::post('/contact', [ContactController::class, 'contactStore'])->name('contact.store');
    Route::get('/help', [HelpController::class, 'pageHelp'])->name('help');
    Route::get('/about', [AboutController::class, 'pageAbout'])->name('about');
    Route::get('/terms', [TermController::class, 'pageTerms'])->name('terms');
    Route::get('/privacy', [PrivacyController::class, 'pagePrivacy'])->name('privacy');
    Route::get('/cookies', [CookieController::class, 'pageCookies'])->name('cookies');
    Route::get('/support', [SupportController::class, 'pageSupport'])->name('support');
    Route::get('/faq', [FaqController::class, 'pageFaq'])->name('faq');
    Route::get('/testimonials', [TestimonialController::class, 'pageTestimonials'])->name('testimonials');
});

require __DIR__.'/settings.php';
