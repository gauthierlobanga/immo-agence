<?php

namespace App\Filament\Admin\Resources\Communes\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CommuneForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations')
                    ->icon('heroicon-o-map')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Select::make('city_id')
                                    ->label('Ville')
                                    ->relationship('city', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->placeholder('Sélectionnez une ville'),

                                TextInput::make('name')
                                    ->label('Nom de la commune')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Ex: Gombe, Lingwala'),

                                TextInput::make('code')
                                    ->label('Code administratif')
                                    ->maxLength(50)
                                    ->placeholder('Ex: COM-001'),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
