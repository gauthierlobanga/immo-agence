<?php

namespace App\Http\Controllers\Immo\Central\Pages\Review;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Property;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'title'   => 'nullable|string|max:255',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        // Vérifier que l'utilisateur n'a pas déjà laissé un avis
        $existingReview = Review::where('property_id', $property->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return back()->with('error', 'Vous avez déjà soumis un avis pour ce bien.');
        }

        $property->reviews()->create([
            'user_id'     => Auth::id(),
            'rating'      => $request->rating,
            'title'       => $request->title,
            'comment'     => $request->comment,
            'is_approved' => false,
        ]);

        return back()->with('success', 'Votre avis a été soumis et sera publié après validation.');
    }
}
