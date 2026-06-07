<?php

namespace App\Http\Controllers\Immo\Central\Pages\Testimonials;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function pageTestimonials()
    {
        return Inertia::render('immo/pages/testimonials/Testimonials');
    }
}
