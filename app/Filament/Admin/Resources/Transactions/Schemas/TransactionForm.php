<?php

namespace App\Filament\Admin\Resources\Transactions\Schemas;

use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TransactionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Détails de la transaction')
                            ->icon('heroicon-o-arrows-right-left')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        Select::make('property_id')
                                            ->label('Bien concerné')
                                            ->relationship('property', 'title')
                                            ->searchable()
                                            ->preload()
                                            ->required(),

                                        Select::make('agent_id')
                                            ->label('Agent responsable')
                                            ->relationship('agent', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        Select::make('buyer_user_id')
                                            ->label('Acheteur')
                                            ->relationship('buyer', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),

                                        Select::make('seller_user_id')
                                            ->label('Vendeur')
                                            ->relationship('seller', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                    ]),

                                Grid::make(2)
                                    ->schema([
                                        Select::make('type')
                                            ->label('Type')
                                            ->options([
                                                'sale' => 'Vente',
                                                'rent' => 'Location',
                                            ])
                                            ->required(),

                                        Select::make('status')
                                            ->label('Statut')
                                            ->options([
                                                'in_progress' => 'En cours',
                                                'completed' => 'Finalisée',
                                                'cancelled' => 'Annulée',
                                            ])
                                            ->required()
                                            ->default('in_progress'),
                                    ]),
                            ]),

                        Section::make('Montants')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Grid::make(3)
                                    ->schema([
                                        TextInput::make('amount')
                                            ->label('Montant')
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

                                        TextInput::make('commission_amount')
                                            ->label('Commission')
                                            ->numeric()
                                            ->prefix('$'),
                                    ]),

                                Toggle::make('commission_paid')
                                    ->label('Commission payée')
                                    ->default(false)
                                    ->onColor('success'),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Dates')
                            ->icon('heroicon-o-calendar-days')
                            ->schema([
                                DatePicker::make('contract_date')
                                    ->label('Date du contrat')
                                    ->required()
                                    ->native(false),

                                DatePicker::make('closing_date')
                                    ->label('Date de clôture')
                                    ->native(false),
                            ]),

                        Section::make('Notes')
                            ->icon('heroicon-o-pencil-square')
                            ->schema([
                                Textarea::make('notes')
                                    ->label('Commentaires')
                                    ->columnSpanFull()
                                    ->rows(3),
                            ]),
                    ]),
            ]);
    }
}
