import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    MapPin,
    Building2,
    Phone,
    Mail,
    Globe,
    Heart,
    Bed,
    Bath,
    Square,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppPublicLayout from '@/layouts/app-public-layout';

interface Agency {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo_url: string;
    banner_url: string;
    is_verified: boolean;
    properties_count: number;
    address: string;
    email: string;
    phone: string;
    website: string;
}

interface Property {
    id: string;
    title: string;
    slug: string;
    price: number;
    currency: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    city: string;
    main_image: string;
    type: string;
}

interface Props {
    agency: {
        data: Agency;
    };
    properties: {
        data: Property[];
        meta: any;
        links: any;
    };
}

function AgencyShow({ agency, properties }: Props) {
    const a = agency.data;

    return (
        <>
            <Head title={a.name} />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {/* Agency Header */}
                <div className="relative h-64 md:h-80 lg:h-96">
                    <img
                        src={
                            a.banner_url ||
                            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600'
                        }
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:pb-12">
                            <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">
                                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
                                    <img
                                        src={
                                            a.logo_url ||
                                            `https://ui-avatars.com/api/?name=${a.name}&background=random`
                                        }
                                        className="h-full w-full rounded-2xl object-contain"
                                    />
                                </div>
                                <div className="text-center text-white md:text-left">
                                    <div className="mb-2 flex items-center justify-center gap-3 md:justify-start">
                                        <h1 className="text-4xl font-black">
                                            {a.name}
                                        </h1>
                                        {a.is_verified && (
                                            <BadgeCheck className="h-8 w-8 fill-emerald-400/20 text-emerald-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center gap-4 text-slate-200 md:justify-start">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>
                                                {a.address || 'Kinshasa, RDC'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-emerald-400">
                                            <Building2 className="h-4 w-4" />
                                            <span>
                                                {a.properties_count} Propriétés
                                                listées
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* About & Contact */}
                        <div className="space-y-8">
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-xl font-bold">
                                    À propos de l'agence
                                </h2>
                                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                                    {a.description ||
                                        `L'agence ${a.name} est spécialisée dans l'immobilier haut de gamme en République Démocratique du Congo. Nous accompagnons nos clients dans l'achat, la vente et la location de biens d'exception.`}
                                </p>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                                            <Phone className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <span className="font-medium">
                                            {a.phone || '+243 820 000 000'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                                            <Mail className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <span className="font-medium">
                                            {a.email}
                                        </span>
                                    </div>
                                    {a.website && (
                                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                                                <Globe className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <a
                                                href={a.website}
                                                target="_blank"
                                                className="font-medium transition-colors hover:text-emerald-600"
                                            >
                                                {a.website}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <Button className="mt-8 w-full rounded-xl bg-emerald-600 py-6 text-lg font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700">
                                    Contacter l'agence
                                </Button>
                            </div>
                        </div>

                        {/* Properties List */}
                        <div className="space-y-8 lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                    Nos Propriétés
                                </h2>
                                <div className="text-sm text-slate-500">
                                    {properties.meta.total} Résultats
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {properties.data.map((property) => (
                                    <Card
                                        key={property.id}
                                        className="group overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all hover:shadow-xl dark:bg-slate-900"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <Link
                                                href={route(
                                                    'properties.show',
                                                    property.slug,
                                                )}
                                            >
                                                <img
                                                    src={property.main_image}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </Link>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="absolute top-4 right-4 rounded-full bg-white/80 text-slate-900 shadow-md backdrop-blur-sm"
                                            >
                                                <Heart className="h-5 w-5" />
                                            </Button>
                                            <Badge className="absolute bottom-4 left-4 border-0 bg-emerald-600 text-white">
                                                {property.type}
                                            </Badge>
                                        </div>
                                        <CardContent className="p-6">
                                            <Link
                                                href={route(
                                                    'properties.show',
                                                    property.slug,
                                                )}
                                            >
                                                <h3 className="truncate text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white">
                                                    {property.title}
                                                </h3>
                                            </Link>
                                            <p className="mt-1 mb-4 text-sm text-slate-500 dark:text-slate-400">
                                                {property.city}
                                            </p>

                                            <p className="mb-6 text-xl font-black text-emerald-600">
                                                {new Intl.NumberFormat(
                                                    'fr-FR',
                                                    {
                                                        style: 'currency',
                                                        currency:
                                                            property.currency,
                                                    },
                                                ).format(property.price)}
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <Bed className="h-4 w-4 text-emerald-500" />
                                                    <span>
                                                        {property.bedrooms}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Bath className="h-4 w-4 text-emerald-500" />
                                                    <span>
                                                        {property.bathrooms}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Square className="h-4 w-4 text-emerald-500" />
                                                    <span>
                                                        {property.area} m²
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {properties.meta.last_page > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {properties.links.map(
                                        (link: any, i: number) => (
                                            <Button
                                                key={i}
                                                variant={
                                                    link.active
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className="rounded-xl"
                                                asChild
                                                disabled={!link.url}
                                            >
                                                <Link
                                                    href={link.url || '#'}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                    preserveState
                                                />
                                            </Button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AgencyShow.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);

export default AgencyShow;
