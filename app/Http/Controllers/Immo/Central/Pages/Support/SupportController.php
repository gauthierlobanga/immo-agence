<?php

namespace App\Http\Controllers\Immo\Central\Pages\Support;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SupportController extends Controller
{

    public function pageSupport()
    {
        return Inertia::render('immo/pages/support/Support');
    }

}
