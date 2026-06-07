<?php

use App\Providers\AppServiceProvider;
use App\Providers\Filament\AdminPanelProvider;
use App\Providers\FortifyServiceProvider;

return [
    AdminPanelProvider::class,
    AppServiceProvider::class,
    FortifyServiceProvider::class,
];
