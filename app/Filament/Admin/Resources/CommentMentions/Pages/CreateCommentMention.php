<?php

namespace App\Filament\Admin\Resources\CommentMentions\Pages;

use App\Filament\Admin\Resources\CommentMentions\CommentMentionResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCommentMention extends CreateRecord
{
    protected static string $resource = CommentMentionResource::class;
}
