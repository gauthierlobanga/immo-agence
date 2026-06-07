<?php

namespace App\Http\Resources\Review;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'title' => $this->title,
            'comment' => $this->comment,
            'is_approved' => $this->is_approved,
            'created_at' => $this->created_at->toIso8601String(),
            'user' => $this->whenLoaded('user', [
                'name' => $this->user->name,
                'avatar_url' => $this->user->avatar_url,
            ]),
        ];
    }
}
