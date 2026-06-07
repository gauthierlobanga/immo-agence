<?php

namespace App\Filament\Admin\Resources\Quartiers\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;


class QuartierForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations')
                    ->icon('heroicon-o-map-pin')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('commune_id')
                                    ->label('Commune')
                                    ->relationship('commune', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->placeholder('Sélectionnez une commune'),

                                TextInput::make('name')
                                    ->label('Nom du quartier')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Ex: Plateau, Yolo'),
                            ]),
                    ]),
            ]);
    }
}
