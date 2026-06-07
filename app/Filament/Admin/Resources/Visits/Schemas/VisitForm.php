<?php

namespace App\Filament\Admin\Resources\Visits\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class VisitForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('property_id')
                    ->relationship('property', 'title')
                    ->required(),
                Select::make('agent_id')
                    ->relationship('agent', 'name')
                    ->required(),
                Select::make('user_id')
                    ->relationship('user', 'name'),
                TextInput::make('visitor_name')
                    ->required(),
                TextInput::make('visitor_email')
                    ->email()
                    ->required(),
                TextInput::make('visitor_phone')
                    ->tel()
                    ->required(),
                DateTimePicker::make('scheduled_at')
                    ->required(),
                TextInput::make('duration_minutes')
                    ->required()
                    ->numeric()
                    ->default(30),
                TextInput::make('status')
                    ->required()
                    ->default('pending'),
                Textarea::make('notes')
                    ->columnSpanFull(),
                DateTimePicker::make('reminder_sent_at'),
            ]);
    }
}
