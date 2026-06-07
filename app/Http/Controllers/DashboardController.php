<?php

namespace App\Http\Controllers;

use App\Http\Resources\Property\PropertyResource;
use App\Models\Favorite;
use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $favorites = Favorite::with('property.media', 'property.commune')
            ->where('user_id', $user->id)
            ->limit(5)
            ->get()
            ->pluck('property');

        $visits = Visit::with('property')
            ->where('user_id', $user->id)
            ->orderBy('visit_date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'favorites' => PropertyResource::collection($favorites),
            'recentVisits' => $visits,
            'stats' => [
                'favorites_count' => Favorite::where('user_id', $user->id)->count(),
                'visits_count' => Visit::where('user_id', $user->id)->count(),
            ]
        ]);
    }
}
