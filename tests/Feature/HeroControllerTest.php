<?php

use App\Models\Property;
use App\Models\User;
use Nnjeim\World\Models\City;
use Nnjeim\World\Models\Country;
use Inertia\Testing\AssertableInertia as Assert;

it('loads the home page with globe deferred props', function () {
    // Act & Assert initial page load
    $response = $this->get(route('home'));
    
    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('immo/pages/home/Home')
        ->has('stats')
        ->has('testimonials')
        // Deferred props are intentionally omitted from initial load payload
        ->missing('globeData')
        ->missing('arcsData')
        ->missing('globeStats')
    );
});
