<?php

namespace App\Filament\Admin\Resources\TeamInvitations\Pages;

use App\Filament\Admin\Resources\TeamInvitations\TeamInvitationResource;
use Filament\Resources\Pages\CreateRecord;

class CreateTeamInvitation extends CreateRecord
{
    protected static string $resource = TeamInvitationResource::class;
}
