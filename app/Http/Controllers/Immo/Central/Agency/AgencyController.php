<?php

namespace App\Http\Controllers\Immo\Central\Agency;

use App\Http\Controllers\Controller;
use App\Http\Resources\Agency\AgencyResource;
use App\Http\Resources\Property\PropertyResource;
use App\Models\Agency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgencyController extends Controller
{
    public function index(Request $request)
    {
        $query = Agency::withCount('properties')
            ->where('is_verified', true);

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $agencies = $query->paginate(12)->withQueryString();

        return Inertia::render('immo/pages/agency/list/List', [
            'agencies' => AgencyResource::collection($agencies),
        ]);
    }

    public function show(Agency $agency)
    {
        $agency->loadCount('properties');
        
        $properties = $agency->properties()
            ->with(['commune', 'media'])
            ->available()
            ->paginate(12);

        return Inertia::render('immo/pages/agency/show/Show', [
            'agency' => new AgencyResource($agency),
            'properties' => PropertyResource::collection($properties),
        ]);
    }
}
