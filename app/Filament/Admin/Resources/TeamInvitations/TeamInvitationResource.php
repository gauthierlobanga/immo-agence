<?php

namespace App\Filament\Admin\Resources\TeamInvitations;

use App\Filament\Admin\Resources\TeamInvitations\Pages\CreateTeamInvitation;
use App\Filament\Admin\Resources\TeamInvitations\Pages\EditTeamInvitation;
use App\Filament\Admin\Resources\TeamInvitations\Pages\ListTeamInvitations;
use App\Filament\Admin\Resources\TeamInvitations\Schemas\TeamInvitationForm;
use App\Filament\Admin\Resources\TeamInvitations\Tables\TeamInvitationsTable;
use App\Models\TeamInvitation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TeamInvitationResource extends Resource
{
    protected static ?string $model = TeamInvitation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEnvelope;

    protected static ?string $recordTitleAttribute = 'email';

    public static function form(Schema $schema): Schema
    {
        return TeamInvitationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TeamInvitationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTeamInvitations::route('/'),
            'create' => CreateTeamInvitation::route('/create'),
            'edit' => EditTeamInvitation::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 10 ? 'success' : 'warning';
    }
}
