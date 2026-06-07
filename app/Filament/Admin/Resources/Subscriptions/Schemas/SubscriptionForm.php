<?php

namespace App\Filament\Admin\Resources\Subscriptions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Détails de l\'abonnement')
                            ->icon('heroicon-o-credit-card')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        Select::make('agency_id')
                                            ->label('Agence')
                                            ->relationship('agency', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),

                                        TextInput::make('plan_name')
                                            ->label('Nom du plan')
                                            ->required()
                                            ->maxLength(100),
                                    ]),

                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('max_properties')
                                            ->label('Max biens')
                                            ->required()
                                            ->numeric()
                                            ->minValue(0),

                                        TextInput::make('max_featured')
                                            ->label('Max en avant')
                                            ->required()
                                            ->numeric()
                                            ->minValue(0),

                                        TextInput::make('price')
                                            ->label('Prix')
                                            ->required()
                                            ->numeric()
                                            ->prefix('$'),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        Select::make('currency')
                                            ->label('Devise')
                                            ->options([
                                                'USD' => 'USD ($)',
                                                'CDF' => 'CDF (FC)',
                                                'EUR' => 'EUR (€)',
                                            ])
                                            ->required()
                                            ->default('USD'),

                                        Select::make('status')
                                            ->label('Statut')
                                            ->options([
                                                'active' => 'Active',
                                                'cancelled' => 'Annulée',
                                                'expired' => 'Expirée',
                                            ])
                                            ->required()
                                            ->default('active'),
                                    ]),
                            ]),

                        Section::make('Période de validité')
                            ->icon('heroicon-o-calendar-days')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        DateTimePicker::make('started_at')
                                            ->label('Date de début')
                                            ->required()
                                            ->native(false),

                                        DateTimePicker::make('ends_at')
                                            ->label('Date de fin')
                                            ->native(false),
                                    ]),
                            ]),
                    ]),
            ]);
    }
}
