<?php

namespace App\Models;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
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
        'agency_id', 'plan_name', 'max_properties', 'max_featured',
        'price', 'currency', 'started_at', 'ends_at', 'status',
    ];

    protected $casts = [
        'max_properties' => 'integer',
        'max_featured' => 'integer',
        'price' => 'decimal:2',
        'started_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && ($this->ends_at === null || $this->ends_at->isFuture());
    }
}
