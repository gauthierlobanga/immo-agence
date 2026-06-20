<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;

class Avenue extends Model
{
    use HasTags,HasUuids;

    /**
     * Indique que les clés primaires ne sont pas auto-incrémentées
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

    protected $fillable = ['quartier_id', 'name'];

    public function quartier(): BelongsTo
    {
        return $this->belongsTo(Quartier::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
