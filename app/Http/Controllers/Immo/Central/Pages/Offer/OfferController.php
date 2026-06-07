<?php

namespace App\Http\Controllers\Immo\Central\Pages\Offer;


use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function store(Request $request, Property $property)
    {
        $request->validate([
            'amount'   => 'required|numeric|min:1',
            'currency' => 'required|in:USD,CDF,EUR',
            'type'     => 'required|in:purchase,rent',
            'message'  => 'nullable|string|max:1000',
        ]);

        $offer = $property->offers()->create([
            'user_id'    => Auth::id(),
            'amount'     => $request->amount,
            'currency'   => $request->currency,
            'type'       => $request->type,
            'message'    => $request->message,
            'status'     => 'pending',
            'expires_at' => now()->addDays(7), // expiration par défaut
        ]);

        // Optionnel : envoyer une notification à l'agent
        // event(new OfferSubmitted($offer));

        return back()->with('success', 'Votre offre a été envoyée avec succès.');
    }

    public function accept(Offer $offer)
    {

        $offer->update(['status' => 'accepted']);

        return back()->with('success', 'Offre acceptée.');
    }

    public function reject(Offer $offer)
    {

        $offer->update(['status' => 'rejected']);

        return back()->with('success', 'Offre refusée.');
    }
}
