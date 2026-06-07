<?php

namespace App\Filament\Admin\Resources\Quartiers\Pages;

use App\Filament\Admin\Resources\Quartiers\QuartierResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListQuartiers extends ListRecords
{
    protected static string $resource = QuartierResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
