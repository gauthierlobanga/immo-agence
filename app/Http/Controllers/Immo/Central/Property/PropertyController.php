<?php

namespace App\Http\Controllers\Immo\Central\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contacts\StoreContactRequest;
use App\Http\Resources\Property\PropertyResource;
use App\Http\Resources\Review\ReviewResource;
use App\Models\Commune;
use App\Models\Contact;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        // Règles de validation (bedrooms et commune_id acceptent une chaîne)
        $rules = [
            'search' => 'nullable|string|max:100',
            'type' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'bedrooms' => 'nullable|string',          // ← on accepte "2,3"
            'commune_id' => 'nullable|string',           // ← idem
            'sort' => 'nullable|string|in:price,created_at,views_count',
            'direction' => 'nullable|string|in:asc,desc',
        ];

        $validated = $request->validate($rules);

        // On garantit que toutes les clés existent (avec null si absentes)
        $filters = array_merge([
            'search' => null,
            'type' => null,
            'min_price' => null,
            'max_price' => null,
            'bedrooms' => null,
            'commune_id' => null,
            'sort' => null,
            'direction' => null,
        ], $validated);

        // Construction de la requête
        $query = Property::with(['agency', 'commune', 'media'])
            ->available()
            ->active();

        if ($filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhereHas('city', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if ($filters['type']) {
            $query->where('type', $filters['type']);
        }

        if ($filters['min_price']) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if ($filters['max_price']) {
            $query->where('price', '<=', $filters['max_price']);
        }

        // Gestion des bedrooms : on split la chaîne en tableau d'entiers
        if ($filters['bedrooms']) {
            $bedrooms = array_map('intval', explode(',', $filters['bedrooms']));
            $query->whereIn('bedrooms', $bedrooms);
        }

        // Gestion des communes : split et conversion en entiers
        if ($filters['commune_id']) {
            $communeIds = array_map('intval', explode(',', $filters['commune_id']));
            $query->whereIn('commune_id', $communeIds);
        }

        $sort = $filters['sort'] ?? 'created_at';
        $direction = $filters['direction'] ?? 'desc';
        $query->orderBy($sort, $direction);

        $properties = $query->paginate($request->input('per_page', 12))
            ->withQueryString();

        return Inertia::render('immo/pages/property/list/List', [
            'properties' => PropertyResource::collection($properties),
            'filters' => $filters,               // toujours un objet avec toutes les clés
            'communes' => Commune::select('id', 'name')->get(),
            'propertyTypes' => Property::query()
                ->distinct()
                ->pluck('type')
                ->filter()
                ->values(),
        ]);
    }

 public function show(Property $property)
{
    $property->incrementViews();
    $property->load([
        'agency',
        'agent',
        'commune',
        'quartier',
        'media',
        'tags',
        'reviews' => function ($query) {
            $query->approved()->with('user')->latest();
        },
    ]);

    $similarProperties = Property::where('type', $property->type)
        ->where('id', '!=', $property->id)
        ->available()
        ->when($property->city_id, fn($q) => $q->where('city_id', $property->city_id))
        ->when($property->commune_id, fn($q) => $q->orWhere('commune_id', $property->commune_id))
        ->when($property->price, fn($q) => $q->whereBetween('price', [$property->price * 0.7, $property->price * 1.3]))
        ->limit(4)
        ->get();

    return Inertia::render('immo/pages/property/show/Show', [
        'property' => new PropertyResource($property),
        'similarProperties' => PropertyResource::collection($similarProperties),
    ]);
}

    public function contact(StoreContactRequest $request, Property $property)
    {
        $validated = $request->validated();

        $property->contacts()->create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'] ?? null,
            'email' => $validated['email'],
            'telephone' => $validated['telephone'] ?? null,
            'sujet' => $validated['sujet'],
            'message' => $validated['message'],
            'categorie' => $validated['categorie'],
            'priorite' => Contact::inferPriority($validated['categorie'], $validated['message']),
            'status' => Contact::STATUS_EN_ATTENTE,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return back()->with('success', 'Votre demande de visite a bien été envoyée. L’agent vous contactera très vite.');
    }
}
