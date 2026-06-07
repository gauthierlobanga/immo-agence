<?php

namespace App\Filament\Admin\Resources\PropertyDocuments\Pages;

use App\Filament\Admin\Resources\PropertyDocuments\PropertyDocumentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPropertyDocuments extends ListRecords
{
    protected static string $resource = PropertyDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
