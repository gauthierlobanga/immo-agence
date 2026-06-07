<?php

namespace App\Filament\Admin\Resources\Reviews\Tables;

use App\Models\Review;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('property.title')
                    ->label('Bien')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.name')
                    ->label('Auteur')
                    ->searchable(),

                TextColumn::make('rating')
                    ->label('Note')
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state))
                    ->sortable(),

                TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('comment')
                    ->label('Commentaire')
                    ->limit(50)
                    ->toggleable(),

                IconColumn::make('is_approved')
                    ->label('Approuvé')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray'),

                TextColumn::make('created_at')
                    ->label('Posté le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_approved')
                    ->label('Approuvé'),
                SelectFilter::make('property')
                    ->relationship('property', 'title')
                    ->searchable()
                    ->preload()
                    ->label('Bien'),
                SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Auteur'),
            ])
            ->recordActions([
                // Action pour approuver
                Action::make('approve')
                    ->label('Approuver')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Review $record) => !$record->is_approved)
                    ->action(function (Review $record) {
                        $record->update(['is_approved' => true]);
                        Notification::make()
                            ->title('Avis approuvé')
                            ->success()
                            ->send();
                    }),
                // Action pour rejeter
                Action::make('reject')
                    ->label('Rejeter')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Review $record) => $record->is_approved)
                    ->action(function (Review $record) {
                        $record->update(['is_approved' => false]);
                        Notification::make()
                            ->title('Avis rejeté')
                            ->warning()
                            ->send();
                    }),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    // Approbation en masse
                   BulkAction::make('approve')
                        ->label('Approuver la sélection')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn ($records) => $records->each->update(['is_approved' => true]))
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation(),
                    // Rejet en masse
                    BulkAction::make('reject')
                        ->label('Rejeter la sélection')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->action(fn ($records) => $records->each->update(['is_approved' => false]))
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation(),
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
