<?php

namespace App\Events;

use App\Models\Property;
use App\Notifications\OrderNotification;
use App\Services\NotificationService;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Property $property
    ) {}

    /**
     * Handle the event - Notifier le vendeur et le client
     */
    public function handle(NotificationService $notificationService): void
    {
        // Notifier le vendeur (propriétaire du tenant)
        $notificationService->notifyTenantOwner(
            $this->property->shop,
            OrderNotification::class,
            [
                'order' => $this->property,
                'action' => 'created',
                'message' => "Nouvelle commande #{$this->property->number}",
            ]
        );

        // Notifier le client
        $notificationService->notifyCustomer(
            $this->property->user,
            OrderNotification::class,
            [
                'order' => $this->property,
                'action' => 'created',
                'message' => "Votre commande #{$this->property->number} a été reçue",
            ]
        );
    }
}
