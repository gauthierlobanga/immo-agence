<?php

namespace App\Filament\Admin\Resources\Visits;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\Visits\Pages\CreateVisit;
use App\Filament\Admin\Resources\Visits\Pages\EditVisit;
use App\Filament\Admin\Resources\Visits\Pages\ListVisits;
use App\Filament\Admin\Resources\Visits\Schemas\VisitForm;
use App\Filament\Admin\Resources\Visits\Tables\VisitsTable;
use App\Models\Visit;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class VisitResource extends Resource
{
    protected static ?string $model = Visit::class;

    protected static string|UnitEnum|null $navigationGroup = NavigationGroup::Immo;

    protected static ?string $recordTitleAttribute = 'property_id';

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
        return VisitForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VisitsTable::configure($table);
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
            'index' => ListVisits::route('/'),
            'create' => CreateVisit::route('/create'),
            'edit' => EditVisit::route('/{record}/edit'),
        ];
    }
}
