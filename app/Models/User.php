<?php

namespace App\Models;

use App\Concerns\HasTeams;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class User extends Authenticatable implements FilamentUser, HasAvatar, HasMedia, HasName, PasskeyUser
{
    use HasFactory,
        Notifiable,
        PasskeyAuthenticatable,
        TwoFactorAuthenticatable,
        HasTeams,
        InteractsWithMedia,
        HasTags,
        HasUuids,
        SoftDeletes;

    /**
     * Indique que les clés primaires ne sont pas auto-incrémentées.
     */
    public $incrementing = false;

    /**
     * Le type de la clé primaire.
     */
    protected $keyType = 'string';

    /**
     * Attributs assignables en masse.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'current_team_id',
        'agency_id',
        'phone',
        'avatar',
        'bio',
        'is_agent',
        'is_active',
        'last_login_at',
        'metadata',
    ];

    /**
     * Attributs cachés.
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Attributs ajoutés au tableau JSON.
     */
    protected $appends = [
        'avatar_url',
        'initials',
    ];

    /**
     * Casts des attributs.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at'        => 'datetime',
            'password'                 => 'hashed',
            'two_factor_confirmed_at'  => 'datetime',
            'is_active'                => 'boolean',
            'is_agent'                 => 'boolean',
            'last_login_at'            => 'datetime',
            'metadata'                 => 'array',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class, 'agent_id');
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class, 'agent_id');
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

    public function transactionsAsBuyer(): HasMany
    {
        return $this->hasMany(Transaction::class, 'buyer_user_id');
    }

    public function transactionsAsSeller(): HasMany
    {
        return $this->hasMany(Transaction::class, 'seller_user_id');
    }

    public function transactionsAsAgent(): HasMany
    {
        return $this->hasMany(Transaction::class, 'agent_id');
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id');
    }

        /*
    |--------------------------------------------------------------------------
    | Media Library
    |--------------------------------------------------------------------------
    */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile()
            ->useDisk('public')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('medium')
            ->format('webp')
            ->width(400)
            ->height(300)
            ->fit(Fit::Crop, 400, 300)
            ->optimize()
            ->nonQueued();

        $this->addMediaConversion('thumbnail')
            ->format('webp')
            ->width(150)
            ->height(150)
            ->fit(Fit::Crop, 150, 150)
            ->optimize()
            ->performOnCollections('avatar');
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

    public function scopeAgents($query)
    {
        return $query->where('is_agent', true);
    }

    public function scopeVerified($query)
    {
        return $query->whereNotNull('email_verified_at');
    }

    public function scopeUnverified($query)
    {
        return $query->whereNull('email_verified_at');
    }

    /*
    |--------------------------------------------------------------------------
    | Accesseurs
    |--------------------------------------------------------------------------
    */
    public function getAvatarUrlAttribute(): string
    {
        if ($this->hasMedia('avatar')) {
            return $this->getFirstMediaUrl('avatar', 'thumbnail');
        }

        if (filled($this->avatar)) {
            return $this->avatar;
        }

        // Fallback : génération par initiales
        $initials = $this->initials;

        return 'https://ui-avatars.com/api/?name=' . urlencode($initials)
            . '&background=F59E0B&color=FFFFFF&size=128&bold=true';
    }

    public function getInitialsAttribute(): string
    {
        $name = trim($this->name ?? $this->email);
        $parts = preg_split('/\s+/', $name, -1, PREG_SPLIT_NO_EMPTY);

        return collect($parts)
            ->map(fn($part) => strtoupper(mb_substr($part, 0, 1)))
            ->take(2)
            ->implode('');
    }

    /*
    |--------------------------------------------------------------------------
    | Filament
    |--------------------------------------------------------------------------
    */
    public function getFilamentName(): string
    {
        return $this->name;
    }

    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url;
    }

    public function canAccessPanel(Panel $panel): bool
    {
        if ($panel->getId() === 'admin') {
            return $this->is_active
                && $this->hasRole('super_admin');
        }

        return false;
    }

    /*
    |--------------------------------------------------------------------------
    | Méthodes d’assistance
    |--------------------------------------------------------------------------
    */
    public function isAgent(): bool
    {
        return $this->is_agent;
    }

    public function isActive(): bool
    {
        return $this->is_active;
    }
}
