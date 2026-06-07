<?php

namespace App\Filament\Admin\Resources\Payments\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PaymentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('transaction_id'),
                TextInput::make('payer_type'),
                TextInput::make('payer_id')
                    ->numeric(),
                TextInput::make('amount')
                    ->required()
                    ->numeric(),
                TextInput::make('currency')
                    ->required()
                    ->default('USD'),
                TextInput::make('payment_method')
                    ->required(),
                TextInput::make('payment_ref'),
                TextInput::make('status')
                    ->required()
                    ->default('pending'),
                DateTimePicker::make('paid_at'),
            ]);
    }
}
