<?php

namespace App\Filament\Admin\Resources\Communes\Pages;

use App\Filament\Admin\Resources\Communes\CommuneResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCommunes extends ListRecords
{
    protected static string $resource = CommuneResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
