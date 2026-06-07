<?php

namespace App\Http\Resources\Agency;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgencyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'website' => $this->website,
            'logo_url' => $this->logo_url,
            'banner_url' => $this->banner_url,
            'is_verified' => $this->is_verified,
            'properties_count' => $this->properties_count,
            'created_at' => $this->created_at?->format('Y-m-d'),

            // Relations
            'properties' => $this->whenLoaded('properties'),
        ];
    }
}
