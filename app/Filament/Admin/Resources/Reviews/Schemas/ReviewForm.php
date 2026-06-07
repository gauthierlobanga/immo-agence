<?php

namespace App\Filament\Admin\Resources\Reviews\Schemas;

use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Contenu de l\'avis')
                            ->icon('heroicon-o-chat-bubble-left-ellipsis')
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
                                            ->label('Auteur')
                                            ->relationship('user', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                    ]),

                                TextInput::make('title')
                                    ->label('Titre de l\'avis')
                                    ->maxLength(255),

                                Select::make('rating')
                                    ->label('Note')
                                    ->options([
                                        1 => '⭐',
                                        2 => '⭐⭐',
                                        3 => '⭐⭐⭐',
                                        4 => '⭐⭐⭐⭐',
                                        5 => '⭐⭐⭐⭐⭐',
                                    ])
                                    ->required()
                                    ->native(false)
                                    ->selectablePlaceholder(false),

                                Textarea::make('comment')
                                    ->label('Commentaire')
                                    ->required()
                                    ->columnSpanFull()
                                    ->rows(4),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Modération')
                            ->icon('heroicon-o-shield-check')
                            ->schema([
                                Toggle::make('is_approved')
                                    ->label('Avis approuvé')
                                    ->default(false)
                                    ->onColor('success')
                                    ->offColor('gray'),
                            ]),
                    ]),
            ]);
    }
}
