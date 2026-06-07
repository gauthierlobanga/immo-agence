<?php

namespace App\Filament\Admin\Resources\TeamInvitations\Schemas;

use App\Enums\TeamRole;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TeamInvitationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('code')
                    ->required(),
                Select::make('team_id')
                    ->relationship('team', 'name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                Select::make('role')
                    ->options(TeamRole::class)
                    ->required(),
                TextInput::make('invited_by')
                    ->required(),
                DateTimePicker::make('expires_at'),
                DateTimePicker::make('accepted_at'),
            ]);
    }
}
