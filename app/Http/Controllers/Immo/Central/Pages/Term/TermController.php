<?php

namespace App\Http\Controllers\Immo\Central\Pages\Term;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TermController extends Controller
{
    public function pageTerms()
    {
        return Inertia::render('immo/pages/terms/Terms');
    }
}
