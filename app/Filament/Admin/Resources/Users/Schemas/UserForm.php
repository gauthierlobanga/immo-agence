<?php

namespace App\Filament\Admin\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Informations personnelles')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nom complet')
                                            ->required()
                                            ->maxLength(255)
                                            ->autofocus(),

                                        TextInput::make('email')
                                            ->label('Adresse email')
                                            ->email()
                                            ->required()
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->suffixIcon('heroicon-m-envelope'),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('phone')
                                            ->label('Téléphone')
                                            ->tel()
                                            ->maxLength(20),

                                        Textarea::make('bio')
                                            ->label('Biographie')
                                            ->maxLength(500)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Section::make('Avatar')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('avatar')
                                    ->label('Photo de profil')
                                    ->avatar()
                                    ->image()
                                    ->imageEditor()
                                    ->circleCropper()
                                    ->collection('avatar')
                                    ->disk('public')
                                    ->directory('users/avatars')
                                    ->maxSize(2048)
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Authentification')
                            ->icon('heroicon-o-lock-closed')
                            ->schema([
                                TextInput::make('password')
                                    ->label('Mot de passe')
                                    ->password()
                                    ->revealable()
                                    ->minLength(8)
                                    ->same('passwordConfirmation')
                                    ->dehydrated(fn ($state) => filled($state))
                                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                                    ->required(fn (string $operation): bool => $operation === 'create')
                                    ->placeholder('Laissez vide pour conserver'),

                                TextInput::make('passwordConfirmation')
                                    ->label('Confirmer le mot de passe')
                                    ->password()
                                    ->revealable()
                                    ->dehydrated(false)
                                    ->required(fn (string $operation): bool => $operation === 'create'),
                            ]),

                        Section::make('Statut & Rôles')
                            ->icon('heroicon-o-shield-check')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Compte activé')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),

                                Toggle::make('is_agent')
                                    ->label('Agent immobilier')
                                    ->default(false)
                                    ->onColor('info')
                                    ->offColor('gray'),

                                Select::make('roles')
                                    ->relationship('roles', 'name')
                                    ->multiple()
                                    ->preload()
                                    ->searchable()
                                    ->native(false),

                                Select::make('agency_id')
                                    ->label('Agence')
                                    ->relationship('agency', 'name')
                                    ->preload()
                                    ->searchable()
                                    ->nullable(),

                                Select::make('current_team_id')
                                    ->label('Équipe actuelle')
                                    ->relationship('currentTeam', 'name')
                                    ->preload()
                                    ->searchable()
                                    ->nullable(),
                            ]),

                        Section::make('Métadonnées')
                            ->icon('heroicon-o-cog')
                            ->collapsed()
                            ->schema([
                                KeyValue::make('metadata')
                                    ->label('Données personnalisées')
                                    ->keyLabel('Clé')
                                    ->valueLabel('Valeur')
                                    ->helperText('Ajoutez des informations supplémentaires au format JSON'),

                                DateTimePicker::make('last_login_at')
                                    ->label('Dernière connexion')
                                    ->disabled()
                                    ->dehydrated(false),

                                DateTimePicker::make('email_verified_at')
                                    ->label('Email vérifié le')
                                    ->native(false)
                                    ->displayFormat('d/m/Y H:i'),
                            ]),
                    ]),
            ]);
    }
}
