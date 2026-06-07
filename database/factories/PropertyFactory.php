<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Nnjeim\World\Models\City;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        $types = ['maison', 'appartement', 'terrain', 'bureau', 'commerce', 'immeuble'];
        $statuses = ['available', 'pending', 'sold', 'rented', 'reserved'];
        $conditions = ['neuf', 'bon', 'à rénover', 'vétuste'];

        return [
            'title'             => $title,
            'slug'              => Str::slug($title) . '-' . Str::random(6),
            'description'       => $this->faker->paragraphs(3, true),
            'price'             => $this->faker->randomFloat(2, 50000, 500000),
            'currency'          => $this->faker->randomElement(['USD', 'CDF', 'EUR']),
            'price_per_sqm'     => $this->faker->optional()->randomFloat(2, 100, 2000),
            'price_negotiable'  => $this->faker->boolean(30),
            'type'              => $this->faker->randomElement($types),
            'subtype'           => $this->faker->optional()->randomElement(['duplex', 'loft', 'villa', 'studio', 'penthouse']),
            'status'            => $this->faker->randomElement($statuses),
            'bedrooms'          => $this->faker->numberBetween(0, 6),
            'bathrooms'         => $this->faker->numberBetween(0, 4),
            'living_rooms'      => $this->faker->numberBetween(0, 2),
            'total_rooms'       => $this->faker->numberBetween(1, 10),
            'area'              => $this->faker->optional()->randomFloat(2, 30, 500),
            'land_area'         => $this->faker->optional()->randomFloat(2, 0, 2000),
            'floor_number'      => $this->faker->optional()->numberBetween(0, 20),
            'total_floors'      => $this->faker->optional()->numberBetween(1, 30),
            'year_built'        => $this->faker->optional()->year(),
            'condition'         => $this->faker->optional()->randomElement($conditions),
            'energy_class'      => $this->faker->optional()->randomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
            'facing'            => $this->faker->optional()->randomElement(['nord', 'sud', 'est', 'ouest']),
            'availability_date' => $this->faker->optional()->date(),
            'property_tax'      => $this->faker->optional()->randomFloat(2, 0, 5000),
            'charges'           => $this->faker->optional()->randomFloat(2, 0, 1000),
            'is_furnished'      => $this->faker->boolean(),
            'has_elevator'      => $this->faker->boolean(),
            'has_parking'       => $this->faker->boolean(),
            'has_balcony'       => $this->faker->boolean(),
            'has_swimming_pool' => $this->faker->boolean(),
            'has_garden'        => $this->faker->boolean(),
            'has_security'      => $this->faker->boolean(),
            'features'          => $this->faker->optional()->randomElements(['wifi', 'climatisation', 'meublé', 'parking', 'piscine', 'jardin', 'ascenseur', 'sécurité'], $this->faker->numberBetween(0, 5)),
            'virtual_tour_url'  => $this->faker->optional()->url(),
            'publication_date'  => now()->subDays($this->faker->numberBetween(0, 60)),
            'expires_at'        => $this->faker->optional()->dateTimeBetween('+1 month', '+1 year'),
            'is_featured'       => $this->faker->boolean(10),
            'is_verified'       => $this->faker->boolean(80),
            'views_count'       => $this->faker->numberBetween(0, 1000),
            'lat'               => $this->faker->optional()->latitude(-4.5, -4.3), // Kinshasa approx
            'lng'               => $this->faker->optional()->longitude(15.2, 15.4),
            'metadata'          => null,
            'city_id'           => City::inRandomOrder()->first()?->id, // utilise une ville existante de la table world
            'commune_id'        => null, // à remplir éventuellement
            'quartier_id'       => null,
            'avenue_id'         => null,
            'address'           => $this->faker->streetAddress(),
            'zip_code'          => $this->faker->postcode(),
            'agent_id'          => User::where('is_agent', true)->inRandomOrder()->first()?->id ?? User::factory(),
            'agency_id'         => Agency::inRandomOrder()->first()?->id, // facultatif
        ];
    }
}
