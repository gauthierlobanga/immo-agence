<?php

namespace App\Filament\Admin\Resources\Offers\Tables;

use App\Models\Offer;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class OffersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('property.title')
                    ->label('Bien')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->type === 'purchase' ? 'Achat' : 'Location'),

                TextColumn::make('user.name')
                    ->label('Client')
                    ->searchable(),

                TextColumn::make('amount')
                    ->label('Montant')
                    ->money(fn ($record) => $record->currency ?? 'USD')
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->label('Statut')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'accepted',
                        'danger' => 'rejected',
                        'gray' => 'expired',
                    ])
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                TextColumn::make('expires_at')
                    ->label('Expire le')
                    ->dateTime('d/m/Y')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'En attente',
                        'accepted' => 'Acceptée',
                        'rejected' => 'Refusée',
                        'expired' => 'Expirée',
                    ]),
                SelectFilter::make('type')
                    ->options([
                        'purchase' => 'Achat',
                        'rent' => 'Location',
                    ]),
                SelectFilter::make('property')
                    ->relationship('property', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Client'),
            ])
            ->recordActions([
                EditAction::make(),

                Action::make('accept')
                    ->label('Accepter')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->action(fn (Offer $record) => $record->update(['status' => 'accepted']))
                    ->visible(fn (Offer $record) => $record->status === 'pending'),

                Action::make('reject')
                    ->label('Refuser')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->action(fn (Offer $record) => $record->update(['status' => 'rejected']))
                    ->visible(fn (Offer $record) => $record->status === 'pending'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
