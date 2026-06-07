<?php

namespace App\Filament\Admin\Resources\Communes\Pages;

use App\Filament\Admin\Resources\Communes\CommuneResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCommune extends EditRecord
{
    protected static string $resource = CommuneResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
