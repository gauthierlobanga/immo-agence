<?php

namespace App\Filament\Admin\Resources\Transactions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TransactionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('property.title')
                    ->label('Bien')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->type === 'sale' ? 'Vente' : 'Location'),

                TextColumn::make('agent.name')
                    ->label('Agent')
                    ->searchable(),

                TextColumn::make('amount')
                    ->label('Montant')
                    ->money(fn ($record) => $record->currency ?? 'USD')
                    ->sortable(),

                TextColumn::make('commission_amount')
                    ->label('Commission')
                    ->money(fn ($record) => $record->currency ?? 'USD')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                IconColumn::make('commission_paid')
                    ->label('Comm. payée')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray'),

                TextColumn::make('status')
                    ->badge()
                    ->label('Statut')
                    ->colors([
                        'warning' => 'in_progress',
                        'success' => 'completed',
                        'danger' => 'cancelled',
                    ])
                    ->formatStateUsing(fn ($state) => match($state) {
                        'in_progress' => 'En cours',
                        'completed' => 'Finalisée',
                        'cancelled' => 'Annulée',
                        default => $state,
                    }),

                TextColumn::make('contract_date')
                    ->label('Contrat')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('closing_date')
                    ->label('Clôture')
                    ->date('d/m/Y')
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'sale' => 'Vente',
                        'rent' => 'Location',
                    ])
                    ->label('Type'),
                SelectFilter::make('status')
                    ->options([
                        'in_progress' => 'En cours',
                        'completed' => 'Finalisée',
                        'cancelled' => 'Annulée',
                    ]),
                SelectFilter::make('agent')
                    ->relationship('agent', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Agent'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('contract_date', 'desc');
    }
}
