<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Nnjeim\World\Models\City;
use Nnjeim\World\Models\Country;
use Nnjeim\World\Models\State;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Property extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, SoftDeletes;
    use HasUuids,HasTags;

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
        'agency_id',
        'agent_id',
        'title',
        'slug',
        'description',
        'price',
        'currency',
        'price_per_sqm',
        'price_negotiable',
        'type',
        'subtype',
        'status',
        'bedrooms',
        'bathrooms',
        'living_rooms',
        'total_rooms',
        'area',
        'land_area',
        'floor_number',
        'total_floors',
        'year_built',
        'condition',
        'energy_class',
        'facing',
        'availability_date',
        'property_tax',
        'charges',
        'is_furnished',
        'has_elevator',
        'has_parking',
        'has_balcony',
        'has_swimming_pool',
        'has_garden',
        'has_security',
        'features',
        'virtual_tour_url',
        'publication_date',
        'expires_at',
        'is_featured',
        'is_verified',
        'views_count',
        'lat',
        'lng',
        'metadata',
        'country_id',
        'state_id',
        'city_id',
        'commune_id',
        'quartier_id',
        'avenue_id',
        'address',
        'zip_code',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'price_per_sqm' => 'decimal:2',
        'price_negotiable' => 'boolean',
        'area' => 'decimal:2',
        'land_area' => 'decimal:2',
        'property_tax' => 'decimal:2',
        'charges' => 'decimal:2',
        'is_furnished' => 'boolean',
        'has_elevator' => 'boolean',
        'has_parking' => 'boolean',
        'has_balcony' => 'boolean',
        'has_swimming_pool' => 'boolean',
        'has_garden' => 'boolean',
        'has_security' => 'boolean',
        'features' => 'array',
        'publication_date' => 'datetime',
        'expires_at' => 'datetime',
        'availability_date' => 'date',
        'is_featured' => 'boolean',
        'is_verified' => 'boolean',
        'views_count' => 'integer',
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
        'metadata' => 'array',
    ];

    // Relations
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(PropertyDocument::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function featuredListings(): HasMany
    {
        return $this->hasMany(FeaturedListing::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    public function quartier(): BelongsTo
    {
        return $this->belongsTo(Quartier::class);
    }

    public function avenue(): BelongsTo
    {
        return $this->belongsTo(Avenue::class);
    }

    // Spatie Media Library
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useDisk('public')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->withResponsiveImages();

        $this->addMediaCollection('videos')
            ->useDisk('public')
            ->acceptsMimeTypes(['video/mp4', 'video/avi', 'video/mpeg']);

        $this->addMediaCollection('documents')
            ->useDisk('public')
            ->acceptsMimeTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(368)
            ->height(232)
            ->sharpen(10);

        $this->addMediaConversion('medium')
            ->width(800)
            ->height(600);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeInCity($query, string $city)
    {
        return $query->where(function ($q) use ($city) {
            $q->where('city', $city)
                ->orWhereHas('city', fn ($q2) => $q2->where('name', $city));
        });
    }

    public function scopePriceBetween($query, float $min, float $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeExpired($query)
    {
        return $query->whereNotNull('expires_at')->where('expires_at', '<', now());
    }

    public function scopeActive($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
        });
    }

    // Accesseurs & Mutateurs
    public function getMainImageAttribute()
    {
        return $this->getFirstMediaUrl('images', 'medium') ?: Storage::url('images/property.jpg');
    }

    public function getGalleryAttribute()
    {
        return $this->getMedia('images')->map(fn ($media) => $media->getUrl('medium'));
    }

    public function getPriceInCDFAttribute(): float
    {
        return $this->price * 2800; // Taux simplifié
    }

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    public function isAvailable(): bool
    {
        return $this->status === 'available' && ($this->expires_at === null || $this->expires_at->isFuture());
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($property) {
            if (empty($property->slug)) {
                $property->slug = Str::slug($property->title).'-'.Str::random(6);
            }
            if (empty($property->publication_date)) {
                $property->publication_date = now();
            }
        });
    }
}
