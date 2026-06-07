<?php

namespace App\Http\Controllers\Immo\Central\Pages\Cookie;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CookieController extends Controller
{
    public function pageCookies()
    {
        return Inertia::render('immo/pages/cookies/Cookies');
    }

}
