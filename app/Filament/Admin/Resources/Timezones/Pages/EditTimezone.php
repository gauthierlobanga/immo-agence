<?php

namespace App\Filament\Admin\Resources\Timezones\Pages;

use App\Filament\Admin\Resources\Timezones\TimezoneResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTimezone extends EditRecord
{
    protected static string $resource = TimezoneResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
