<?php

namespace App\Http\Controllers\Immo\Central\Pages\Faq;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function pageFaq()
    {
        return Inertia::render('immo/pages/faq/Faq');
    }
}
