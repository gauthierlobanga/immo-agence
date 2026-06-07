<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
    use HasTags,HasUuids;

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

    /**
     * Get the agency that owns the property.
     * Chaque propriété est associée à une agence immobilière qui en est responsable. Cette relation
     * permet de lier chaque bien à une agence spécifique, facilitant ainsi la gestion des biens et la communication avec les clients potentiels. L'agence peut être une entreprise ou un groupe d'agents immobiliers qui gèrent plusieurs biens, offrant ainsi une meilleure visibilité et une gestion plus efficace des propriétés.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * Get the agent that owns the property.
     * Chaque propriété est associée à un agent immobilier qui en est responsable. Cette relation permet
     * de lier chaque bien à un agent spécifique, facilitant ainsi la gestion des biens et la communication avec les clients potentiels. L'agent peut être un utilisateur de la plateforme qui a des compétences en vente immobilière et qui gère les interactions liées à ce bien, telles que les visites, les offres, et les négociations.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    /**
     * Get the documents for the property.
     * Chaque document représente un fichier lié à ce bien immobilier, tel qu'un plan, un
     * diagnostic, un certificat énergétique, ou tout autre document pertinent. Cette relation permet de stocker et de gérer facilement tous les fichiers associés à un bien, facilitant ainsi la consultation et le partage d'informations importantes avec les clients potentiels ou les agents immobiliers.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function documents(): HasMany
    {
        return $this->hasMany(PropertyDocument::class);
    }

    /**
     * Get the contacts for the property.
     * Chaque contact représente une demande d'information ou de visite liée à ce bien immobilier. Cette relation permet de suivre toutes les interactions des clients potentiels avec le bien, facilitant ainsi la gestion des leads et des demandes de renseignements.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    /**
     * Get the visits for the property.
     * Chaque visite représente une demande de visite ou une visite programmée pour ce bien immobilier.
     * Cette relation permet de suivre toutes les visites liées au bien, facilitant ainsi la gestion des rendez-vous et des interactions avec les clients potentiels.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    /**
     * Get the favorites for the property.
     * Chaque favori représente une action d'un utilisateur qui a ajouté ce bien immobilier à sa liste de favoris. Cette relation permet de suivre tous les utilisateurs qui ont montré de l'intérêt pour le
     * bien, facilitant ainsi la gestion des leads et la personnalisation de l'expérience utilisateur en fonction de leurs préférences.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    /**
     * Get the reviews for the property.
     * Chaque avis représente une évaluation ou un commentaire laissé par un utilisateur concernant ce bien immobilier. Cette relation permet de suivre toutes les opinions des clients sur le bien, facilitant ainsi la prise de décision et l'amélioration du service.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the offers for the property.
     * Chaque offre représente une proposition de vente ou d'achat liée à ce bien immobilier. Cette relation permet de suivre toutes les offres associées au bien, facilitant ainsi la gestion des transactions et la négociation avec les clients potentiels.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * Get the transactions for the property.
     * Chaque transaction représente une opération de vente ou d'achat liée à ce bien immobilier. Cette relation permet de suivre toutes les transactions associées au bien, facilitant ainsi la gestion des opérations et la documentation des échanges.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Get the featured listings for the property.
     * Chaque annonce en vedette représente une promotion ou une mise en avant de ce bien immobilier sur la plateforme. Cette relation permet de suivre toutes les annonces en vedette associées au bien, facilitant ainsi la gestion des campagnes de marketing et la visibilité du bien auprès des clients potentiels.
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function featuredListings(): HasMany
    {
        return $this->hasMany(FeaturedListing::class);
    }

    /**
     * Get the country that owns the property.
     * Chaque propriété est située dans un pays spécifique, et cette relation permet de lier chaque
     * bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des biens en fonction de leur emplacement.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the state that owns the property.
     * Chaque propriété est située dans un état ou une région spécifique, et cette relation permet de lier chaque bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des
     * biens en fonction de leur emplacement.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

        /**
        * Get the city that owns the property.
        * Chaque propriété est située dans une ville spécifique, et cette relation permet de lier chaque bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des biens en fonction de leur emplacement.
        * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
        */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Get the commune that owns the property.
     * Chaque propriété est située dans une commune spécifique, et cette relation permet de lier chaque bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des biens en fonction
     * de leur emplacement. La commune est une subdivision administrative qui peut être utilisée pour affiner les recherches et les filtres basés sur la localisation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

        /**
        * Get the quartier that owns the property.
        * Chaque propriété est située dans un quartier spécifique, et cette relation permet de lier chaque bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des biens en fonction de leur emplacement. Le quartier est une subdivision plus fine que la commune, offrant une granularité supplémentaire pour les recherches basées sur la localisation.
        * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
        */
    public function quartier(): BelongsTo
    {
        return $this->belongsTo(Quartier::class);
    }

    /**
     * Get the avenue that owns the property.
     * Chaque propriété est située dans une avenue spécifique, et cette relation permet de lier chaque bien à une localisation géographique précise, facilitant ainsi la recherche et la gestion des biens en fonction de leur emplacement. L'avenue est une subdivision encore plus fine que le quartier, offrant une granularité maximale pour les recherches basées sur la localisation.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function avenue(): BelongsTo
    {
        return $this->belongsTo(Avenue::class);
    }

    /**
     * Enregistre les collections de médias pour les propriétés, permettant de gérer les images, vidéos et documents associés à chaque bien immobilier. Cette méthode utilise la bibliothèque Spatie Media Library pour définir les types de fichiers acceptés et les conversions d'images, facilitant ainsi la gestion des médias liés aux propriétés.
     * @return void
     */
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
    public function scopeAvailable(Builder $query)
    {
        return $query->where('status', 'available');
    }

    public function scopeFeatured(Builder $query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeVerified(Builder $query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeByType(Builder $query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeInCity(Builder $query, string $city)
    {
        return $query->where(function (Builder $q) use ($city) {
            $q->where('city', $city)
                ->orWhereHas('city', fn (Builder $q2) => $q2->where('name', $city));
        });
    }

    public function scopePriceBetween(Builder $query, float $min, float $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeExpired(Builder $query)
    {
        return $query->whereNotNull('expires_at')->where('expires_at', '<', now());
    }

    public function scopeActive(Builder $query)
    {
        return $query->where(function (Builder $q) {
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
