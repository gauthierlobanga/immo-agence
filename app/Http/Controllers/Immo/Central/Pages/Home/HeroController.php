<?php

namespace App\Http\Controllers\Immo\Central\Pages\Home;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Produit;
use App\Models\Property;
use App\Models\Tenant;
use App\Models\User;
use Inertia\Inertia;
use Nnjeim\World\Models\Country;

class HeroController extends Controller
{
    public function Index()
    {

        $stats = [
            'stores_created' => User::count(),
            'products_listed' => Property::available()->count(),
            'countries_served' => Country::count(),
        ];

        $testimonials = [
            [
                'name' => 'Marie K.',
                'store' => 'Les Pépites de Marie',
                'quote' => 'Grâce à Yetu, j’ai pu lancer ma boutique en un week-end. Les outils sont incroyablement simples.',
                'avatar' => 'https://randomuser.me/api/portraits/women/1.jpg',
            ],
            [
                'name' => 'Jean-Paul M.',
                'store' => 'Artisanat du Kivu',
                'quote' => 'J’ai triplé mes ventes depuis que je suis passé sur Yetu. Le support est réactif et efficace.',
                'avatar' => 'https://randomuser.me/api/portraits/men/1.jpg',
            ],
        ];

        return Inertia::render('immo/pages/home/Home', [
            'stats' => $stats,
            'testimonials' => $testimonials,
        ]);
    }
}
