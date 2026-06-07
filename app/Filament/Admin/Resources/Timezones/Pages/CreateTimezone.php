<?php

namespace App\Filament\Admin\Resources\Timezones\Pages;

use App\Filament\Admin\Resources\Timezones\TimezoneResource;
use Filament\Resources\Pages\CreateRecord;

class CreateTimezone extends CreateRecord
{
    protected static string $resource = TimezoneResource::class;
}
