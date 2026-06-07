<?php

namespace App\Filament\Admin\Resources\CommentMentions\Pages;

use App\Filament\Admin\Resources\CommentMentions\CommentMentionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCommentMention extends EditRecord
{
    protected static string $resource = CommentMentionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
