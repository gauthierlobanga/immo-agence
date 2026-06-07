<?php

namespace App\Filament\Admin\Resources\PropertyDocuments;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\PropertyDocuments\Pages\CreatePropertyDocument;
use App\Filament\Admin\Resources\PropertyDocuments\Pages\EditPropertyDocument;
use App\Filament\Admin\Resources\PropertyDocuments\Pages\ListPropertyDocuments;
use App\Filament\Admin\Resources\PropertyDocuments\Schemas\PropertyDocumentForm;
use App\Filament\Admin\Resources\PropertyDocuments\Tables\PropertyDocumentsTable;
use App\Models\PropertyDocument;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class PropertyDocumentResource extends Resource
{
    protected static ?string $model = PropertyDocument::class;

    protected static string|UnitEnum|null $navigationGroup = NavigationGroup::Immo;

    protected static ?string $recordTitleAttribute = 'type';

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
        return PropertyDocumentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PropertyDocumentsTable::configure($table);
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
            'index' => ListPropertyDocuments::route('/'),
            'create' => CreatePropertyDocument::route('/create'),
            'edit' => EditPropertyDocument::route('/{record}/edit'),
        ];
    }
}
