<?php

namespace App\Filament\Admin\Resources\Subscriptions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SubscriptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('agency.name')
                    ->label('Agence')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('plan_name')
                    ->label('Plan')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('max_properties')
                    ->label('Biens')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('max_featured')
                    ->label('En avant')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('price')
                    ->label('Prix')
                    ->money(fn ($record) => $record->currency ?? 'USD')
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->label('Statut')
                    ->colors([
                        'success' => 'active',
                        'danger' => 'cancelled',
                        'warning' => 'expired',
                    ])
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                TextColumn::make('started_at')
                    ->label('Début')
                    ->dateTime('d/m/Y')
                    ->sortable(),

                TextColumn::make('ends_at')
                    ->label('Fin')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'cancelled' => 'Annulée',
                        'expired' => 'Expirée',
                    ]),
                SelectFilter::make('agency')
                    ->relationship('agency', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Agence'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('started_at', 'desc');
    }
}
