<?php

namespace App\Filament\Admin\Resources\Offers\Schemas;

use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OfferForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Détails de l\'offre')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        Select::make('property_id')
                                            ->label('Bien concerné')
                                            ->relationship('property', 'title')
                                            ->searchable()
                                            ->preload()
                                            ->required(),

                                        Select::make('user_id')
                                            ->label('Client')
                                            ->relationship('user', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                    ]),

                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('amount')
                                            ->label('Montant proposé')
                                            ->required()
                                            ->numeric()
                                            ->prefix('$'),

                                        Select::make('currency')
                                            ->label('Devise')
                                            ->options([
                                                'USD' => 'USD ($)',
                                                'CDF' => 'CDF (FC)',
                                                'EUR' => 'EUR (€)',
                                            ])
                                            ->required()
                                            ->default('USD'),

                                        Select::make('type')
                                            ->label('Type d\'offre')
                                            ->options([
                                                'purchase' => 'Achat',
                                                'rent' => 'Location',
                                            ])
                                            ->required(),
                                    ]),

                                Textarea::make('message')
                                    ->label('Message du client')
                                    ->columnSpanFull()
                                    ->rows(3),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Statut')
                            ->icon('heroicon-o-flag')
                            ->schema([
                                Select::make('status')
                                    ->label('Statut')
                                    ->options([
                                        'pending' => 'En attente',
                                        'accepted' => 'Acceptée',
                                        'rejected' => 'Refusée',
                                        'expired' => 'Expirée',
                                    ])
                                    ->required()
                                    ->default('pending'),

                                DateTimePicker::make('expires_at')
                                    ->label('Date d\'expiration')
                                    ->minDate(now())
                                    ->native(false),
                            ]),
                    ]),
            ]);
    }
}
