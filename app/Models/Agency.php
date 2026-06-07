<?php

namespace App\Models;

use App\Models\AgencyUser;
use App\Models\Property;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;

class Agency extends Model implements HasMedia
{
    use HasFactory,HasTags, SoftDeletes, HasUuids, InteractsWithMedia;

    /**
     * Indique que les clés primaires ne sont pas auto-incrémentées.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Le type de la clé primaire.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'logo',
        'address',
        'phone',
        'email',
        'website',
        'rccm',
        'id_nat',
        'tax_number',
        'is_active',
        'metadata',
    ];

    /**
     * Les attributs qui doivent être castés.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'metadata'   => 'array',
    ];

    /*
    |--------------------------------------------------------------------------
    | Media Library
    |--------------------------------------------------------------------------
    */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')
            ->useDisk('public')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']);
    }

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'agency_user')
            ->using(AgencyUser::class)
            ->withPivot('role', 'permissions')
            ->withTimestamps();
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    /*
    |--------------------------------------------------------------------------
    | Accesseurs & Mutateurs
    |--------------------------------------------------------------------------
    */
    public function getLogoUrlAttribute(): string
    {
        return $this->getFirstMediaUrl('logo') ?: Storage::url('images/property.jpg');
    }

    public function getAgentCountAttribute(): int
    {
        return $this->users()->wherePivot('role', 'agent')->count();
    }

    public function getActivePropertiesCountAttribute(): int
    {
        return $this->properties()->available()->count();
    }

    /*
    |--------------------------------------------------------------------------
    | Méthodes d’assistance
    |--------------------------------------------------------------------------
    */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    public function activate(): void
    {
        $this->update(['is_active' => true]);
    }

    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscriptions()->where('status', 'active')
            ->where(function ($q) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            })->exists();
    }

    /*
    |--------------------------------------------------------------------------
    | Boot
    |--------------------------------------------------------------------------
    */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($agency) {
            if (empty($agency->slug)) {
                $agency->slug = Str::slug($agency->name) . '-' . Str::random(6);
            }
        });
    }
}
