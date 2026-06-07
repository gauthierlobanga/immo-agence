<?php

namespace App\Filament\Admin\Resources\Properties\Schemas;

use App\Models\Avenue;
use App\Models\Commune;
use App\Models\Quartier;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Nnjeim\World\Models\City;
use Nnjeim\World\Models\Country;
use Nnjeim\World\Models\State;

class PropertyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Informations principales')
                            ->icon('heroicon-o-home')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        Select::make('agency_id')
                                            ->label('Agence')
                                            ->relationship('agency', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),

                                        Select::make('agent_id')
                                            ->label('Agent responsable')
                                            ->relationship('agent', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),

                                    ]),
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Titre')
                                            ->required()
                                            ->maxLength(255)
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state).'-'.Str::random(6))),

                                        TextInput::make('slug')
                                            ->label('Slug')
                                            ->required()
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->disabled()
                                            ->dehydrated(true),
                                    ]),

                                RichEditor::make('description')
                                    ->label('Description')
                                    ->required()
                                    ->columnSpanFull()
                                    ->fileAttachmentsDisk('public')
                                    ->fileAttachmentsDirectory('properties/editor'),
                            ]),

                        Section::make('Détails du bien')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        Select::make('type')
                                            ->label('Type de bien')
                                            ->options([
                                                'maison' => 'Maison',
                                                'appartement' => 'Appartement',
                                                'terrain' => 'Terrain',
                                                'bureau' => 'Bureau',
                                                'commerce' => 'Commerce',
                                                'immeuble' => 'Immeuble',
                                                'autre' => 'Autre',
                                            ])
                                            ->required()
                                            ->reactive()
                                            ->preload()
                                            ->searchable(),

                                        TextInput::make('subtype')
                                            ->label('Sous-type')
                                            ->placeholder('Ex : duplex, loft, villa')
                                            ->maxLength(100),

                                        Select::make('status')
                                            ->label('Statut')
                                            ->options([
                                                'available' => 'Disponible',
                                                'pending' => 'En attente',
                                                'sold' => 'Vendu',
                                                'rented' => 'Loué',
                                                'reserved' => 'Réservé',
                                            ])
                                            ->required()
                                            ->default('available')
                                            ->preload()
                                            ->searchable(),
                                    ]),

                                Grid::make(4)
                                    ->schema([
                                        TextInput::make('bedrooms')->label('Chambres')->numeric(),
                                        TextInput::make('bathrooms')->label('Salles de bain')->numeric(),
                                        TextInput::make('living_rooms')->label('Salons')->numeric(),
                                        TextInput::make('total_rooms')->label('Pièces totales')->numeric(),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('area')->label('Surface habitable (m²)')->numeric()->suffix('m²'),
                                        TextInput::make('land_area')->label('Surface terrain (m²)')->numeric()->suffix('m²'),
                                    ]),

                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('floor_number')->label('Étage')->numeric(),
                                        TextInput::make('total_floors')->label('Nombre d\'étages')->numeric(),
                                        TextInput::make('year_built')->label('Année de construction')->numeric()->minValue(1800)->maxValue(now()->year),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        Select::make('condition')
                                            ->label('État')
                                            ->options([
                                                'neuf' => 'Neuf',
                                                'bon' => 'Bon',
                                                'à rénover' => 'À rénover',
                                                'vétuste' => 'Vétuste',
                                            ])
                                            ->preload()
                                            ->searchable(),
                                        Select::make('energy_class')
                                            ->label('Classe énergétique')
                                            ->options(['A' => 'A', 'B' => 'B', 'C' => 'C', 'D' => 'D', 'E' => 'E', 'F' => 'F', 'G' => 'G'])
                                            ->preload()
                                            ->searchable(),
                                    ]),
                                TextInput::make('facing')->label('Orientation')->maxLength(50),
                            ]),

                        Section::make('Prix et finance')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('price')
                                            ->label('Prix')
                                            ->required()
                                            ->numeric()
                                            ->prefix('$')
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set, callable $get) => $get('area') && $state ? $set('price_per_sqm', round($state / $get('area'), 2)) : null
                                            ),
                                        TextInput::make('currency')
                                            ->label('Devise')
                                            ->required()
                                            ->default('USD')
                                            ->maxLength(3)
                                            ->disabled(),
                                        TextInput::make('price_per_sqm')
                                            ->label('Prix / m²')
                                            ->numeric()
                                            ->prefix('$')
                                            ->disabled()
                                            ->dehydrated(false),
                                    ]),
                                Toggle::make('price_negotiable')->label('Prix négociable')->default(false),
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('property_tax')->label('Taxe foncière annuelle')->numeric()->prefix('$'),
                                        TextInput::make('charges')->label('Charges mensuelles')->numeric()->prefix('$'),
                                    ]),
                            ]),

                        Section::make('Équipements & Caractéristiques')
                            ->icon('heroicon-o-cog')
                            ->schema([
                                Grid::make(4)
                                    ->schema([
                                        Toggle::make('is_furnished')->label('Meublé'),
                                        Toggle::make('has_elevator')->label('Ascenseur'),
                                        Toggle::make('has_parking')->label('Parking'),
                                        Toggle::make('has_balcony')->label('Balcon'),
                                        Toggle::make('has_swimming_pool')->label('Piscine'),
                                        Toggle::make('has_garden')->label('Jardin'),
                                        Toggle::make('has_security')->label('Sécurité'),
                                    ]),
                                KeyValue::make('features')
                                    ->label('Autres caractéristiques')
                                    ->keyLabel('Équipement')
                                    ->valueLabel('Valeur')
                                    ->addActionLabel('Ajouter une caractéristique'),
                            ]),
                    ]),

                // Colonne latérale
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Médias')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('images')
                                    ->collection('images')
                                    ->multiple()
                                    ->reorderable()
                                    ->panelLayout('grid')
                                    ->image()
                                    ->imageEditor()
                                    ->maxSize(5120),
                                TextInput::make('virtual_tour_url')
                                    ->label('Visite virtuelle (URL)')
                                    ->url()
                                    ->placeholder('https://'),

                            ]),

                        Section::make('Publication')
                            ->icon('heroicon-o-globe-alt')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        Toggle::make('is_featured')->label('Mis en avant')->default(false),
                                        Toggle::make('is_verified')->label('Vérifié')->default(false),
                                    ]),
                                Grid::make(2)
                                    ->schema([
                                        DateTimePicker::make('publication_date')->label('Publié le'),
                                        DateTimePicker::make('expires_at')->label('Expire le'),
                                    ]),
                                TextInput::make('views_count')
                                    ->label('Vues')
                                    ->numeric()
                                    ->disabled()
                                    ->dehydrated(false),
                            ]),

                        Section::make('Localisation')
                            ->icon('heroicon-o-map-pin')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('address')
                                            ->label('Adresse')
                                            ->maxLength(255),

                                        TextInput::make('zip_code')
                                            ->label('Code postal')
                                            ->maxLength(20),

                                        // Pays (via world, pas de création)
                                        Select::make('country_id')
                                            ->label('Pays')
                                            ->relationship('country', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(fn () => Country::pluck('name', 'id'))
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('state_id', null)),

                                        // Province/État (via world, pas de création)
                                        Select::make('state_id')
                                            ->label('Province / État')
                                            ->relationship('state', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(function (callable $get) {
                                                $country = $get('country_id');
                                                if ($country) {
                                                    return State::where('country_id', $country)->pluck('name', 'id');
                                                }

                                                return [];
                                            })
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('city_id', null)),

                                        // Ville (via world, pas de création)
                                        Select::make('city_id')
                                            ->label('Ville')
                                            ->relationship('city', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(function (callable $get) {
                                                $state = $get('state_id');
                                                if ($state) {
                                                    return City::where('state_id', $state)->pluck('name', 'id');
                                                }

                                                return [];
                                            })
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('commune_id', null)),

                                        // Commune (modèle local, création possible)
                                        Select::make('commune_id')
                                            ->label('Commune')
                                            ->relationship('commune', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(function (callable $get) {
                                                $city = $get('city_id');
                                                if ($city) {
                                                    return Commune::where('city_id', $city)->pluck('name', 'id');
                                                }

                                                return [];
                                            })
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('quartier_id', null))
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->label('Nom de la commune')
                                                    ->required()
                                                    ->maxLength(255),
                                                Select::make('city_id')
                                                    ->label('Ville')
                                                    ->options(City::pluck('name', 'id'))
                                                    ->searchable()
                                                    ->required(),
                                            ]),

                                        // Quartier (modèle local, création possible)
                                        Select::make('quartier_id')
                                            ->label('Quartier')
                                            ->relationship('quartier', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(function (callable $get) {
                                                $commune = $get('commune_id');
                                                if ($commune) {
                                                    return Quartier::where('commune_id', $commune)->pluck('name', 'id');
                                                }

                                                return [];
                                            })
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('avenue_id', null))
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->label('Nom du quartier')
                                                    ->required()
                                                    ->maxLength(255),
                                                Select::make('commune_id')
                                                    ->label('Commune')
                                                    ->options(Commune::pluck('name', 'id'))
                                                    ->searchable()
                                                    ->required(),
                                            ]),

                                        // Avenue (modèle local, création possible)
                                        Select::make('avenue_id')
                                            ->label('Avenue')
                                            ->relationship('avenue', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->options(function (callable $get) {
                                                $quartier = $get('quartier_id');
                                                if ($quartier) {
                                                    return Avenue::where('quartier_id', $quartier)->pluck('name', 'id');
                                                }

                                                return [];
                                            })
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->label('Nom de l\'avenue')
                                                    ->required()
                                                    ->maxLength(255),
                                                Select::make('quartier_id')
                                                    ->label('Quartier')
                                                    ->options(Quartier::pluck('name', 'id'))
                                                    ->searchable()
                                                    ->required(),
                                            ]),
                                    ]),
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('lat')->label('Latitude')->numeric()->step(0.0000001),
                                        TextInput::make('lng')->label('Longitude')->numeric()->step(0.0000001),
                                    ]),
                            ])->columnSpanFull(),
                        Section::make('Métadonnées')
                            ->icon('heroicon-o-cog-8-tooth')
                            ->collapsed()
                            ->schema([
                                KeyValue::make('metadata')
                                    ->label('Champs personnalisés')
                                    ->keyLabel('Clé')
                                    ->valueLabel('Valeur'),
                            ])->columnSpanFull(),
                    ]),
            ]);
    }
}
