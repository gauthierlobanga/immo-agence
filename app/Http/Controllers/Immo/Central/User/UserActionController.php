<?php

namespace App\Http\Controllers\Immo\Central\User;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Property;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserActionController extends Controller
{
    public function toggleFavorite(Property $property)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $favorite = Favorite::where('user_id', $user->id)
            ->where('property_id', $property->id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['favorite' => false, 'message' => 'Retiré des favoris']);
        }

        Favorite::create([
            'user_id' => $user->id,
            'property_id' => $property->id
        ]);

        return response()->json(['favorite' => true, 'message' => 'Ajouté aux favoris']);
    }

    public function requestVisit(Request $request, Property $property)
    {
        $user = Auth::user();
        
        $request->validate([
            'visit_date' => 'required|date|after:today',
            'message' => 'nullable|string|max:500',
        ]);

        Visit::create([
            'user_id' => $user?->id,
            'property_id' => $property->id,
            'agency_id' => $property->agency_id,
            'visit_date' => $request->visit_date,
            'status' => 'pending',
            'notes' => $request->message,
        ]);

        return back()->with('success', 'Votre demande de visite a été envoyée.');
    }
}
