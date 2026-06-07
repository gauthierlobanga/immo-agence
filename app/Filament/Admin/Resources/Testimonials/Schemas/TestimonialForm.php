<?php

namespace App\Filament\Admin\Resources\Testimonials\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->components([
                        Section::make('Témoignage')
                            ->icon('heroicon-o-chat-bubble-left-ellipsis')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('client_name')
                                            ->label('Nom du client')
                                            ->required()
                                            ->maxLength(100),

                                        Select::make('rating')
                                            ->label('Note')
                                            ->options([
                                                1 => '⭐',
                                                2 => '⭐⭐',
                                                3 => '⭐⭐⭐',
                                                4 => '⭐⭐⭐⭐',
                                                5 => '⭐⭐⭐⭐⭐',
                                            ])
                                            ->nullable()
                                            ->native(false)
                                            ->selectablePlaceholder(false),
                                    ]),

                                Textarea::make('content')
                                    ->label('Message')
                                    ->required()
                                    ->columnSpanFull()
                                    ->rows(4),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->components([
                        Section::make('Photo')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('client_photo')
                                    ->collection('client_photo')
                                    ->image()
                                    ->imageEditor()
                                    ->avatar()
                                    ->maxSize(2048)
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                            ]),

                        Section::make('Visibilité')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Toggle::make('is_visible')
                                    ->label('Visible sur le site')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('gray'),
                            ]),
                    ]),
            ]);
    }
}
