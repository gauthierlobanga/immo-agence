<?php

namespace App\Http\Controllers\Immo\Central\Pages\Privacy;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrivacyController extends Controller
{
    public function pagePrivacy()
    {
        return Inertia::render('immo/pages/privacy/Privacy');
    }
}
