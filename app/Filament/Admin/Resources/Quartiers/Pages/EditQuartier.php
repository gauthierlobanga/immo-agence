<?php

namespace App\Filament\Admin\Resources\Quartiers\Pages;

use App\Filament\Admin\Resources\Quartiers\QuartierResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditQuartier extends EditRecord
{
    protected static string $resource = QuartierResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
