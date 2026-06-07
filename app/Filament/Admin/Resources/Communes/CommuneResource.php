<?php

namespace App\Filament\Admin\Resources\Communes;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\Communes\Pages\CreateCommune;
use App\Filament\Admin\Resources\Communes\Pages\EditCommune;
use App\Filament\Admin\Resources\Communes\Pages\ListCommunes;
use App\Filament\Admin\Resources\Communes\Schemas\CommuneForm;
use App\Filament\Admin\Resources\Communes\Tables\CommunesTable;
use App\Models\Commune;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class CommuneResource extends Resource
{
    protected static ?string $model = Commune::class;

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
        return CommuneForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CommunesTable::configure($table);
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
            'index' => ListCommunes::route('/'),
            'create' => CreateCommune::route('/create'),
            'edit' => EditCommune::route('/{record}/edit'),
        ];
    }
}
