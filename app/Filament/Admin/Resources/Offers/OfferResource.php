<?php

namespace App\Filament\Admin\Resources\Offers;

use App\Enums\NavigationGroup;
use App\Filament\Admin\Resources\Offers\Pages\CreateOffer;
use App\Filament\Admin\Resources\Offers\Pages\EditOffer;
use App\Filament\Admin\Resources\Offers\Pages\ListOffers;
use App\Filament\Admin\Resources\Offers\Schemas\OfferForm;
use App\Filament\Admin\Resources\Offers\Tables\OffersTable;
use App\Models\Offer;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class OfferResource extends Resource
{
    protected static ?string $model = Offer::class;

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
        return OfferForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OffersTable::configure($table);
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
            'index' => ListOffers::route('/'),
            'create' => CreateOffer::route('/create'),
            'edit' => EditOffer::route('/{record}/edit'),
        ];
    }
}
