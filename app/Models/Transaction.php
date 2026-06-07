<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * Indique que la clé primaire est une UUID au lieu d'un entier auto-incrémenté.
     * Cela permet d'utiliser des UUID pour les identifiants de permission, ce qui est plus sécurisé et plus difficile à deviner que les identifiants auto-incrémentés.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Le type de la clé primaire
     *
     * @var string
     */
    protected $keyType = 'string';

    protected $fillable = [
        'property_id', 'buyer_user_id', 'seller_user_id', 'agent_id',
        'type', 'amount', 'currency', 'commission_amount', 'commission_paid',
        'contract_date', 'closing_date', 'status', 'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'commission_paid' => 'boolean',
        'contract_date' => 'date',
        'closing_date' => 'date',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_user_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_user_id');
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function markCommissionPaid()
    {
        $this->update(['commission_paid' => true]);
    }
}
