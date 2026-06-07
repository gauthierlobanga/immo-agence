<?php

namespace App\Filament\Admin\Resources\Avenues\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AvenueForm
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
                                Select::make('quartier_id')
                                    ->label('Quartier')
                                    ->relationship('quartier', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->placeholder('Sélectionnez un quartier'),

                                TextInput::make('name')
                                    ->label('Nom de l\'avenue')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Ex: Avenue de la Liberté'),
                            ]),
                    ]),
            ]);
    }
}
