/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, Link } from '@inertiajs/react';
import {
    Heart,
    Calendar,
    Building2,
    ChevronRight,
    Bed,
    Bath,
    Square,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

interface Property {
    id: string;
    title: string;
    slug: string;
    price: number;
    currency: string;
    main_image: string;
    city: string;
}

interface Visit {
    id: string;
    visit_date: string;
    status: string;
    property: Property;
}

interface Props {
    favorites: {
        data: Property[];
    };
    recentVisits: Visit[];
    stats: {
        favorites_count: number;
        visits_count: number;
    };
    currentTeam?: {
        slug: string;
    };
}

export default function Dashboard({
    favorites,
    recentVisits,
    stats,
    currentTeam,
}: Props) {
    return (
        <div className="space-y-8 p-6">
            <Head title="Tableau de bord" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                        Tableau de bord
                    </h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Bienvenue dans votre espace personnel.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-3xl border-0 bg-white shadow-sm dark:bg-slate-900">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30">
                                <Heart className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Favoris
                                </p>
                                <p className="text-2xl font-black">
                                    {stats.favorites_count}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border-0 bg-white shadow-sm dark:bg-slate-900">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30">
                                <Calendar className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Visites
                                </p>
                                <p className="text-2xl font-black">
                                    {stats.visits_count}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Recent Favorites */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Vos Favoris Récents
                        </h2>
                        <Link
                            href="#"
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            Voir tout
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {favorites.data.length > 0 ? (
                            favorites.data.map((property) => (
                                <Link
                                    key={property.id}
                                    href={route(
                                        'properties.show',
                                        property.slug,
                                    )}
                                    className="group flex gap-4 rounded-3xl border border-slate-100 bg-white p-4 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                                        <img
                                            src={property.main_image}
                                            alt={property.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="truncate font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white">
                                            {property.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {property.city}
                                        </p>
                                        <p className="mt-1 font-bold text-emerald-600">
                                            {new Intl.NumberFormat('fr-FR', {
                                                style: 'currency',
                                                currency: property.currency,
                                            }).format(property.price)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-600" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-12 text-center dark:border-slate-800 dark:bg-slate-900">
                                <Heart className="mx-auto mb-4 h-12 w-12 text-slate-200" />
                                <p className="text-slate-500">
                                    Aucun favori pour le moment.
                                </p>
                                <Link
                                    href={route('properties.index')}
                                    className="mt-4 inline-block text-sm font-bold text-emerald-600"
                                >
                                    Découvrir des propriétés
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Visits */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Visites Programmées
                        </h2>
                        <Link
                            href="#"
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            Voir tout
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentVisits.length > 0 ? (
                            recentVisits.map((visit) => (
                                <div
                                    key={visit.id}
                                    className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                            <Calendar className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {new Date(
                                                    visit.visit_date,
                                                ).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <p className="max-w-50 truncate text-sm text-slate-500">
                                                {visit.property.title}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        className={
                                            visit.status === 'pending'
                                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                                : visit.status === 'confirmed'
                                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                                  : 'bg-slate-100 text-slate-700'
                                        }
                                    >
                                        {visit.status === 'pending'
                                            ? 'En attente'
                                            : visit.status}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-12 text-center dark:border-slate-800 dark:bg-slate-900">
                                <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-200" />
                                <p className="text-slate-500">
                                    Aucune visite programmée.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
