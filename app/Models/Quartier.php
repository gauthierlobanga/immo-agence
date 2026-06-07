<?php

namespace App\Models;

use App\Models\Avenue;
use App\Models\Commune;
use App\Models\Property;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;

class Quartier extends Model
{
    use HasFactory;
    use HasUuids;
    use HasTags;

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

     protected $fillable = ['commune_id', 'name'];

    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    public function avenues(): HasMany
    {
        return $this->hasMany(Avenue::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
