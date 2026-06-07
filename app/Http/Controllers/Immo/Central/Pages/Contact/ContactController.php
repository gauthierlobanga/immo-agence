<?php

namespace App\Http\Controllers\Immo\Central\Pages\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contacts\StoreContactRequest;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function contactIndex(): Response
    {
        return Inertia::render('immo/pages/contact/Contact', [
            'categories' => Contact::getCategories(),
            'contactInfo' => $this->getContactInfo(),
        ]);
    }

    public function contactStore(StoreContactRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Contact::create([
            'nom'        => $validated['nom'],
            'prenom'     => $validated['prenom'] ?? null,
            'email'      => $validated['email'],
            'telephone'  => $validated['telephone'] ?? null,
            'categorie'  => $validated['categorie'],
            'sujet'      => $validated['sujet'],
            'message'    => $validated['message'],
            'property_id'=> $validated['property_id'] ?? null,
            'status'     => Contact::STATUS_EN_ATTENTE,
            'priorite'   => Contact::inferPriority($validated['categorie'], $validated['message']),
            'ip_address' => $request->ip(),
            'user_agent' => \Illuminate\Support\Str::limit((string) $request->userAgent(), 255, ''),
            'metadata'   => [
                'source' => 'contact_page',
                'url'    => $request->fullUrl(),
                'locale' => app()->getLocale(),
            ],
        ]);

        return back()->with('success', 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.');
    }

    private function getContactInfo(): array
    {

        // Vous pouvez récupérer ces informations depuis Spatie Settings ou la table settings
        return [
            'appName'       => config('app.name'),
            'email'         => config('mail.from.address', 'contact@immo.test'),
            'phone'         => '+243 123 456 789',
            'address'       => '123 Avenue de l\'Immobilier, Kinshasa',
            'responseTime'  => '< 24h ouvrables',
            'availability'  => 'Du lundi au samedi, 8h - 18h',
            'supportHours'  => 'Support technique 7j/7',
            'location'      => 'Kinshasa – RDC',
        ];
    }
}
