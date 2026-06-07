<?php

namespace App\Filament\Admin\Resources\PropertyDocuments\Pages;

use App\Filament\Admin\Resources\PropertyDocuments\PropertyDocumentResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePropertyDocument extends CreateRecord
{
    protected static string $resource = PropertyDocumentResource::class;
}
