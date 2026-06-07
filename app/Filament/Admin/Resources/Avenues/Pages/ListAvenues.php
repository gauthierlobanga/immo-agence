<?php

namespace App\Filament\Admin\Resources\Avenues\Pages;

use App\Filament\Admin\Resources\Avenues\AvenueResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAvenues extends ListRecords
{
    protected static string $resource = AvenueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
