<?php

namespace App\Filament\Admin\Resources\Avenues;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\Avenues\Pages\CreateAvenue;
use App\Filament\Admin\Resources\Avenues\Pages\EditAvenue;
use App\Filament\Admin\Resources\Avenues\Pages\ListAvenues;
use App\Filament\Admin\Resources\Avenues\Schemas\AvenueForm;
use App\Filament\Admin\Resources\Avenues\Tables\AvenuesTable;
use App\Models\Avenue;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class AvenueResource extends Resource
{
    protected static ?string $model = Avenue::class;

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
        return AvenueForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AvenuesTable::configure($table);
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
            'index' => ListAvenues::route('/'),
            'create' => CreateAvenue::route('/create'),
            'edit' => EditAvenue::route('/{record}/edit'),
        ];
    }
}
