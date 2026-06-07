<?php

namespace App\Filament\Admin\Resources\Agencies\Schemas;

use Filament\Forms;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class AgencyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Informations générales')
                            ->icon('heroicon-o-building-office')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nom de l\'agence')
                                            ->required()
                                            ->maxLength(255)
                                            ->reactive()
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state) . '-' . Str::random(6))),

                                        TextInput::make('slug')
                                            ->label('Slug')
                                            ->required()
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->disabled()
                                            ->dehydrated(true),
                                    ]),

                                Textarea::make('address')
                                    ->label('Adresse')
                                    ->columnSpanFull()
                                    ->rows(3),

                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('phone')
                                            ->label('Téléphone')
                                            ->tel()
                                            ->required()
                                            ->maxLength(50),

                                        TextInput::make('email')
                                            ->label('Adresse email')
                                            ->email()
                                            ->required()
                                            ->maxLength(255),
                                    ]),

                                TextInput::make('website')
                                    ->label('Site web')
                                    ->url()
                                    ->prefix('https://')
                                    ->maxLength(255),
                            ]),

                        Section::make('Informations légales (RDC)')
                            ->icon('heroicon-o-document-check')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('rccm')
                                            ->label('RCCM')
                                            ->maxLength(100),

                                        TextInput::make('id_nat')
                                            ->label('ID National')
                                            ->maxLength(100),

                                        TextInput::make('tax_number')
                                            ->label('Numéro d\'impôt')
                                            ->maxLength(100),
                                    ]),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Logo')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('logo')
                                    ->collection('logo')
                                    ->image()
                                    ->imageEditor()
                                    ->maxSize(2048)
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
                                    ->columnSpanFull(),
                            ]),

                        Section::make('Statut')
                            ->icon('heroicon-o-shield-check')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Agence active')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),
                            ]),

                        Section::make('Métadonnées')
                            ->icon('heroicon-o-cog-8-tooth')
                            ->collapsed()
                            ->schema([
                                KeyValue::make('metadata')
                                    ->label('Données personnalisées')
                                    ->keyLabel('Clé')
                                    ->valueLabel('Valeur'),
                            ]),
                    ]),
            ]);
    }
}
