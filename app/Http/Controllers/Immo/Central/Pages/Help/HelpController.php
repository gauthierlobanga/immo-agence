<?php

namespace App\Http\Controllers\Immo\Central\Pages\Help;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HelpController extends Controller
{
    public function pageHelp()
    {
        return Inertia::render('immo/pages/help/Help');
    }

}
