<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 2. Créer les tables locales (liées à world_cities)
        Schema::create('communes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('city_id')->constrained('cities')->cascadeOnDelete(); // table 'cities' de world
            $table->string('name');
            $table->string('code')->nullable(); // code administratif local
            $table->timestamps();
        });

        Schema::create('quartiers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('commune_id')->constrained('communes')->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('avenues', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('quartier_id')->constrained('quartiers')->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        // 3. Le reste des tables métiers (inchangé, juste copier ce qu'on a déjà)
        // agencies
        Schema::create('agencies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 50);
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('rccm', 100)->nullable()->comment('Registre de commerce RDC');
            $table->string('id_nat', 100)->nullable()->comment('ID national');
            $table->string('tax_number', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // users : on modifie via alter car la table existe déjà
        Schema::table('users', function (Blueprint $table) {
            $table->foreignUuid('agency_id')->nullable()->after('id')->constrained('agencies')->nullOnDelete();
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->boolean('is_agent')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->softDeletes();
        });

        Schema::create('agency_user', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('agency_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['agency_id', 'user_id']);
        });

        // properties (avec liens vers world_cities et nos nouvelles communes/quartiers/avenues)
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('agency_id')->nullable()->constrained('agencies')->nullOnDelete();
            $table->foreignUuid('agent_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 15, 2);
            $table->string('currency', 3)->default('USD');
            $table->decimal('price_per_sqm', 10, 2)->nullable();
            $table->boolean('price_negotiable')->default(false);
            $table->string('type', 50);
            $table->string('subtype', 100)->nullable();
            $table->string('status', 30)->default('available');
            $table->smallInteger('bedrooms')->nullable();
            $table->smallInteger('bathrooms')->nullable();
            $table->smallInteger('living_rooms')->nullable();
            $table->smallInteger('total_rooms')->nullable();
            $table->decimal('area', 10, 2)->nullable();
            $table->decimal('land_area', 10, 2)->nullable();
            $table->smallInteger('floor_number')->nullable();
            $table->smallInteger('total_floors')->nullable();
            $table->smallInteger('year_built')->nullable();
            $table->string('condition', 50)->nullable();
            $table->char('energy_class', 1)->nullable();
            $table->string('facing', 50)->nullable();
            $table->date('availability_date')->nullable();
            $table->decimal('property_tax', 12, 2)->nullable();
            $table->decimal('charges', 12, 2)->nullable();
            $table->boolean('is_furnished')->default(false);
            $table->boolean('has_elevator')->default(false);
            $table->boolean('has_parking')->default(false);
            $table->boolean('has_balcony')->default(false);
            $table->boolean('has_swimming_pool')->default(false);
            $table->boolean('has_garden')->default(false);
            $table->boolean('has_security')->default(false);
            $table->jsonb('features')->nullable();
            $table->string('virtual_tour_url')->nullable();
            $table->timestamp('publication_date')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->integer('views_count')->default(0);
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->jsonb('metadata')->nullable();

            // Liens géographiques utilisant les tables de world et locales
            $table->foreignId('country_id')->nullable()->constrained('countries')->nullOnDelete(); // world
            $table->foreignId('state_id')->nullable()->constrained('states')->nullOnDelete();   // world (province)
            $table->foreignId('city_id')->nullable()->constrained('cities')->nullOnDelete();    // world
            $table->foreignUuid('commune_id')->nullable()->constrained('communes')->nullOnDelete();
            $table->foreignUuid('quartier_id')->nullable()->constrained('quartiers')->nullOnDelete();
            $table->foreignUuid('avenue_id')->nullable()->constrained('avenues')->nullOnDelete();
            // Champs textuels pour compatibilité
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('zip_code')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['agency_id', 'agent_id', 'type', 'status', 'price', 'city_id', 'is_featured', 'publication_date'], 'properties_search_index');
        });

        // property_documents
        Schema::create('property_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->string('type', 50);
            $table->string('file_path');
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false);
            $table->timestamps();
        });

        // visits
        Schema::create('visits', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('agent_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('visitor_name', 100);
            $table->string('visitor_email', 100);
            $table->string('visitor_phone', 30);
            $table->dateTime('scheduled_at');
            $table->integer('duration_minutes')->default(30);
            $table->string('status', 30)->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('reminder_sent_at')->nullable();
            $table->timestamps();
        });

        // favorites
        Schema::create('favorites', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->unique(['user_id', 'property_id']);
        });

        // reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating')->unsigned();
            $table->string('title')->nullable();
            $table->text('comment');
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });

        // offers
        Schema::create('offers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 15, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('type', 20);
            $table->text('message')->nullable();
            $table->string('status', 30)->default('pending');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        // transactions
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('buyer_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignUuid('seller_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignUuid('agent_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 20);
            $table->decimal('amount', 15, 2);
            $table->string('currency', 3)->default('USD');
            $table->decimal('commission_amount', 15, 2)->nullable();
            $table->boolean('commission_paid')->default(false);
            $table->date('contract_date');
            $table->date('closing_date')->nullable();
            $table->string('status', 30)->default('in_progress');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // payments
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('transaction_id')->nullable()->constrained()->nullOnDelete();
            $table->nullableMorphs('payer');
            $table->decimal('amount', 15, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('payment_method', 50);
            $table->string('payment_ref')->nullable();
            $table->string('status', 30)->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        // subscriptions
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('agency_id')->constrained()->cascadeOnDelete();
            $table->string('plan_name', 100);
            $table->integer('max_properties');
            $table->integer('max_featured');
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->timestamp('started_at');
            $table->timestamp('ends_at')->nullable();
            $table->string('status', 30)->default('active');
            $table->timestamps();
        });

        // featured_listings
        Schema::create('featured_listings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('property_id')->constrained()->cascadeOnDelete();
            $table->timestamp('started_at');
            $table->timestamp('ends_at');
            $table->decimal('amount_paid', 10, 2);
            $table->foreignUuid('payment_id')->nullable()->constrained('payments')->nullOnDelete();
            $table->timestamps();
        });

        // testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('client_name', 100);
            $table->string('client_photo')->nullable();
            $table->text('content');
            $table->tinyInteger('rating')->nullable()->unsigned();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('featured_listings');
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('offers');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('visits');

        Schema::dropIfExists('property_documents');
        Schema::dropIfExists('properties');
        Schema::dropIfExists('avenues');
        Schema::dropIfExists('quartiers');
        Schema::dropIfExists('communes');
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedforeignUuid('agency_id');
            $table->dropColumn([
                'phone', 'avatar', 'bio', 'is_agent', 'is_active',
                'last_login_at', 'metadata', 'deleted_at'
            ]);
        });
        Schema::dropIfExists('agency_user');
        Schema::dropIfExists('agencies');
    }
};
