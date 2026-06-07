// resources/js/types/immobilier/properties.ts
import type { Key } from 'react';

// --- Media Spatie (images/vidéos) ---
export interface MediaItem {
    id: number;
    url: string;           // URL du média original
    thumb?: string;        // URL miniature (conversion 'thumb')
    medium?: string;       // URL taille moyenne (conversion 'medium')
    mime_type: string;
    name: string;
    size: number;
    collection_name: string;
}

// --- Relations géographiques (World) ---
export interface Country {
    id: number;
    name: string;
    iso2?: string;
}

export interface State {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
}

export interface Commune {
    id: number;
    name: string;
}

export interface Quartier {
    id: number;
    name: string;
}

export interface Avenue {
    id: number;
    name: string;
}

// --- Autres relations ---
export interface Agency {
    id: number;
    name: string; // exemple, à compléter selon ton modèle Agency
}

export interface Agent {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    avatar_url?: string | null;
}

export interface PropertyDocument {
    id: number;
    title: string;
    file_url: string;
    type?: string;
}

export interface Contact {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    message?: string;
}

export interface Visit {
    id: number;
    date: string;
    client_name?: string;
}

export interface Favorite {
    id: number;
    user_id: number;
}

export interface Review {
    id: Key | null | undefined;
    rating: number;
    comment: string;
    user_name?: string;
    created_at: string;
}

export interface Offer {
    id: number;
    amount: number;
    status?: string;
}

export interface Transaction {
    id: number;
    amount: number;
    status?: string;
    date?: string;
}

export interface FeaturedListing {
    id: number;
    start_date: string;
    end_date: string;
}

// --- Interface Property principale ---
export interface Property {
    images?: Array<{ id?: number; url: string; alt?: string }>;
    id: string;                     // UUID
    agency_id: string | null;
    agent_id: string | null;
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    price_per_sqm: number | null;
    price_negotiable: boolean;
    type: string;                   // 'apartment', 'house', etc.
    subtype?: string;
    status: string;                 // 'available', 'sold', 'rented', etc.
    bedrooms: number;
    bathrooms: number;
    living_rooms: number;
    total_rooms: number;
    area: number;                   // surface habitable (m²)
    address: string;
    land_area: number | null;
    floor_number: number | null;
    total_floors: number | null;
    year_built: number | null;
    condition: string | null;       // 'new', 'good', 'to renovate'
    energy_class: string | null;
    facing: string | null;          // 'north', 'south', etc.
    availability_date: string | null;
    property_tax: number | null;
    charges: number | null;
    is_furnished: boolean;
    has_elevator: boolean;
    has_parking: boolean;
    has_balcony: boolean;
    has_swimming_pool: boolean;
    has_garden: boolean;
    has_security: boolean;
    features: string[] | null;      // JSON casté en tableau
    virtual_tour_url: string | null;
    publication_date: string;
    expires_at: string | null;
    is_featured: boolean;
    is_verified: boolean;
    views_count: number;
    rating?: number;
    lat: number | null;
    lng: number | null;
    metadata: Record<string, any> | null;

    // Relations imbriquées (selon besoin dans les pages)
    agency?: Agency | null;
    agent?: Agent | null;
    country?: Country | null;
    state?: State | null;
    city?: City | null;
    commune?: Commune | null;
    quartier?: Quartier | null;
    avenue?: Avenue | null;
    documents?: PropertyDocument[];
    contacts?: Contact[];
    visits?: Visit[];
    favorites?: Favorite[];
    reviews?: Review[];
    offers?: Offer[];
    transactions?: Transaction[];
    featuredListings?: FeaturedListing[];

    // Accesseurs Spatie Media Library
    main_image?: string;            // URL image principale (medium)
    gallery?: string[];             // URLs images (medium)
    videos?: MediaItem[];
    documents_media?: MediaItem[];  // fichiers PDF/DOC

    // Accesseur calculé
    price_in_cdf?: number;
}

// --- Types pour les filtres et recherche ---
export interface PropertyFilters {
    type?: string;
    status?: string;
    city?: string;
    min_price?: number;
    max_price?: number;
    min_area?: number;
    max_area?: number;
    bedrooms?: number;
    bathrooms?: number;
    is_furnished?: boolean;
    has_parking?: boolean;
    has_swimming_pool?: boolean;
    // etc.
}

// --- Pagination (si besoin) ---
export interface PaginatedProperties {
    data: Property[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

// --- Props de page (exemple) ---
export interface PropertiesPageProps {
    [key: string]: any;
    properties: PaginatedProperties;
    featuredProperties: Property[];
    filters: PropertyFilters;
    cities: City[];
    types: string[];
    // etc.
}

export interface HeaderCategory {
    id: number;
    nom: string;
    slug: string;
    url: string;
    image: string | null;
}
