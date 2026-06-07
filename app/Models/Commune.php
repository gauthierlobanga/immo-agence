<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Nnjeim\World\Models\City;
use Spatie\Tags\HasTags;

class Commune extends Model
{
     use HasUuids,HasTags;

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

    protected $fillable = ['city_id', 'name', 'code'];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function quartiers(): HasMany
    {
        return $this->hasMany(Quartier::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
