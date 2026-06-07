<?php

namespace App\Filament\Admin\Resources\CommentLikes\Pages;

use App\Filament\Admin\Resources\CommentLikes\CommentLikeResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCommentLike extends CreateRecord
{
    protected static string $resource = CommentLikeResource::class;
}
