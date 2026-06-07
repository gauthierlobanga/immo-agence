<?php

namespace App\Filament\Admin\Resources\CommentLikes\Pages;

use App\Filament\Admin\Resources\CommentLikes\CommentLikeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCommentLike extends EditRecord
{
    protected static string $resource = CommentLikeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
