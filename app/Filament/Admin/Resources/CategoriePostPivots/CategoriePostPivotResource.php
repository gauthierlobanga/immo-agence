<?php

namespace App\Filament\Admin\Resources\CategoriePostPivots;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\CategoriePostPivots\Pages\CreateCategoriePostPivot;
use App\Filament\Admin\Resources\CategoriePostPivots\Pages\EditCategoriePostPivot;
use App\Filament\Admin\Resources\CategoriePostPivots\Pages\ListCategoriePostPivots;
use App\Filament\Admin\Resources\CategoriePostPivots\Schemas\CategoriePostPivotForm;
use App\Filament\Admin\Resources\CategoriePostPivots\Tables\CategoriePostPivotsTable;
use App\Models\PostCategoryPivot;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class CategoriePostPivotResource extends Resource
{
    protected static ?string $model = PostCategoryPivot::class;

    protected static string|UnitEnum|null $navigationGroup = NavigationGroup::Blog;

    protected static ?string $recordTitleAttribute = 'est_principale';

    protected static ?int $navigationSort = 3;

    protected static bool $isScopedToTenant = false;

    public static function form(Schema $schema): Schema
    {
        return CategoriePostPivotForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CategoriePostPivotsTable::configure($table);
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
            'index' => ListCategoriePostPivots::route('/'),
            'create' => CreateCategoriePostPivot::route('/create'),
            'edit' => EditCategoriePostPivot::route('/{record}/edit'),
        ];
    }
}
