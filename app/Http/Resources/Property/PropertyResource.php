<?php

namespace App\Http\Resources\Property;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'currency' => $this->currency,
            'price_per_sqm' => $this->price_per_sqm,
            'price_negotiable' => $this->price_negotiable,
            'type' => $this->type,
            'subtype' => $this->subtype,
            'status' => $this->status,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'living_rooms' => $this->living_rooms,
            'total_rooms' => $this->total_rooms,
            'area' => $this->area,
            'land_area' => $this->land_area,
            'floor_number' => $this->floor_number,
            'total_floors' => $this->total_floors,
            'year_built' => $this->year_built,
            'condition' => $this->condition,
            'energy_class' => $this->energy_class,
            'facing' => $this->facing,
            'availability_date' => $this->availability_date?->format('Y-m-d'),
            'property_tax' => $this->property_tax,
            'charges' => $this->charges,
            'is_furnished' => $this->is_furnished,
            'has_elevator' => $this->has_elevator,
            'has_parking' => $this->has_parking,
            'has_balcony' => $this->has_balcony,
            'has_swimming_pool' => $this->has_swimming_pool,
            'has_garden' => $this->has_garden,
            'has_security' => $this->has_security,
            'features' => $this->features,
            'virtual_tour_url' => $this->virtual_tour_url,
            'publication_date' => $this->publication_date?->format('Y-m-d'),
            'is_featured' => $this->is_featured,
            'is_verified' => $this->is_verified,
            'views_count' => $this->views_count,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'city' => $this->city,
            'address' => $this->address,
            'zip_code' => $this->zip_code,

            // Relations
            'agency' => $this->whenLoaded('agency', fn () => [
                'id' => $this->agency->id,
                'name' => $this->agency->name,
                'logo_url' => $this->agency->logo_url,
                'slug' => $this->agency->slug,
            ]),
            'agent' => $this->whenLoaded('agent', fn () => [
                'id' => $this->agent->id,
                'name' => $this->agent->name,
                'avatar_url' => $this->agent->avatar_url,
            ]),
            'commune' => $this->whenLoaded('commune', fn () => [
                'id' => $this->commune->id,
                'name' => $this->commune->name,
            ]),
            'quartier' => $this->whenLoaded('quartier', fn () => [
                'id' => $this->quartier->id,
                'name' => $this->quartier->name,
            ]),

            'images' => $this->whenLoaded('media', fn () => $this->getMedia('images')->map(fn ($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'thumb' => $media->getUrl('thumb'),
                'medium' => $media->getUrl('medium'),
            ])),

            'main_image' => $this->main_image,
        ];
    }
}
