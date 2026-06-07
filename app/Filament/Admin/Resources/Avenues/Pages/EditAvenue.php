<?php

namespace App\Filament\Admin\Resources\Avenues\Pages;

use App\Filament\Admin\Resources\Avenues\AvenueResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAvenue extends EditRecord
{
    protected static string $resource = AvenueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
