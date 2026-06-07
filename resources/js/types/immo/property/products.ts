// resources/js/types/immobilier/properties.ts (à ajouter à la suite du fichier)

export interface PlatformStats {
    // Métriques
    pageLoadTime?: string;
    uptime?: string;
    supportResponseTime?: string;

    // Statistiques spécifiques à l'immobilier
    propertiesCount?: number;        // nb total de propriétés
    transactionsCount?: number;     // transactions réussies
    agenciesCount?: number;         // nombre d'agences
    countriesServed?: number;       // pays couverts

    // Contenu dynamique (éditable via Spatie Settings)
    testimonials?: Array<{
        name: string;
        role?: string;
        quote: string;
    }>;

    values?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;

    faqs?: Array<{
        question: string;
        answer: string;
    }>;
}

export interface RecentProperty {
    id: string;              // UUID
    title: string;           // titre de la propriété
    slug: string;
    price: number;
    status: string;          // "available", "sold", "rented"...
    image: string;           // URL image principale (main_image)
    edit_url: string;        // route d'édition dans l'admin
    views_count?: number;    // optionnel, pour afficher la popularité
}
