<?php

namespace App\Filament\Admin\Resources\Quartiers;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\Quartiers\Pages\CreateQuartier;
use App\Filament\Admin\Resources\Quartiers\Pages\EditQuartier;
use App\Filament\Admin\Resources\Quartiers\Pages\ListQuartiers;
use App\Filament\Admin\Resources\Quartiers\Schemas\QuartierForm;
use App\Filament\Admin\Resources\Quartiers\Tables\QuartiersTable;
use App\Models\Quartier;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class QuartierResource extends Resource
{
    protected static ?string $model = Quartier::class;

    protected static string|UnitEnum|null $navigationGroup = NavigationGroup::Immo;

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 10 ? 'success' : 'warning';
    }

    public static function form(Schema $schema): Schema
    {
        return QuartierForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return QuartiersTable::configure($table);
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
            'index' => ListQuartiers::route('/'),
            'create' => CreateQuartier::route('/create'),
            'edit' => EditQuartier::route('/{record}/edit'),
        ];
    }
}
