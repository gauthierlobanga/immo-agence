<?php

namespace App\Http\Controllers\Immo\Central\Pages\About;

use App\Http\Controllers\Controller;
// use App\Models\Adresse;
// use App\Models\Commande;
// use App\Models\Paiement;
// use App\Models\Produit;
use App\Models\Property;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function pageAbout()
    {
        $platformStats = Cache::remember('home_platform_stats', 3600, function () {
            return [
                'pageLoadTime' => '< 1.2s', // Valeur statique ou issue d'un outil de monitoring
                'uptime' => '99.99%',        // Idem
                'supportResponseTime' => '< 2h', // À configurer manuellement ou via un paramètre
                'productsCount' => Property::available()->count(),
                // 'ordersProcessed' => Commande::whereIn('statut', [Commande::STATUT_TERMINE, Commande::STATUT_EN_COURS])->count(),
                // 'paymentMethods' => Paiement::distinct('mode')->count('mode'),
                // 'countriesServed' => Adresse::distinct('pays')->count('pays'), // Nombre de pays uniques où des commandes ont été livrées
            ];
        });

        return Inertia::render('immo/pages/about/About', [
            'platformStats' => $platformStats,
        ]);
    }

}
