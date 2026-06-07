<?php

namespace App\Http\Controllers\Immo\Central\Pages\Entreprises;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EntrepriseController extends Controller
{
    public function entrepriseIndex()
    {
        return Inertia::render('immo/pages/entreprise/Index');
    }
}
