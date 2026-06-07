<?php

namespace App\Filament\Admin\Resources\Properties\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class PropertiesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->label('Photo')
                    ->collection('images')
                    ->conversion('thumb')
                    ->limit(3)
                    ->stacked()
                    ->circular()
                    ->disk('public')
                    ->visibility('public')
                    ->imageSize(40),

                TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->limit(30)
                    ->tooltip(fn ($record) => $record->title)
                    ->description(fn ($record) => $record->city?->name),

                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->colors([
                        'success' => 'available',
                        'warning' => 'pending',
                        'danger' => 'sold',
                        'info' => 'rented',
                        'gray' => 'reserved',
                    ])
                    ->formatStateUsing(fn ($state) => ucfirst($state)),

                TextColumn::make('type')
                    ->label('Type')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('price')
                    ->label('Prix')
                    ->money('USD')
                    ->sortable(),

                TextColumn::make('agency.name')
                    ->label('Agence')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('agent.name')
                    ->label('Agent')
                    ->searchable()
                    ->toggleable(),

                IconColumn::make('is_featured')
                    ->label('En avant')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning'),

                IconColumn::make('is_verified')
                    ->label('Vérifié')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray'),

                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'available' => 'Disponible',
                        'pending' => 'En attente',
                        'sold' => 'Vendu',
                        'rented' => 'Loué',
                        'reserved' => 'Réservé',
                    ])
                    ->preload()
                    ->searchable(),
                SelectFilter::make('type')
                    ->options([
                        'maison' => 'Maison',
                        'appartement' => 'Appartement',
                        'terrain' => 'Terrain',
                        'bureau' => 'Bureau',
                        'commerce' => 'Commerce',
                        'immeuble' => 'Immeuble',
                    ])
                    ->preload()
                    ->searchable(),
                SelectFilter::make('agency')
                    ->relationship('agency', 'name')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('agent')
                    ->relationship('agent', 'name')
                    ->searchable()
                    ->preload(),
                TernaryFilter::make('is_featured')
                    ->label('Mis en avant'),
                TernaryFilter::make('is_verified')
                    ->label('Vérifié'),
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordTitleAttribute('title');
    }
}
