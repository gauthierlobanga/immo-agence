<?php

namespace App\Filament\Admin\Resources\TeamInvitations\Pages;

use App\Filament\Admin\Resources\TeamInvitations\TeamInvitationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTeamInvitation extends EditRecord
{
    protected static string $resource = TeamInvitationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
