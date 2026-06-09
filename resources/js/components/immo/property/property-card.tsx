/* eslint-disable react-hooks/purity */
// resources/js/components/immo/property/property-card.tsx
import { Link } from '@inertiajs/react';
import type { variants } from 'framer-motion';
import { motion } from 'framer-motion';
import {
    Heart,
    Bed,
    Bath,
    Square,
    CheckCircle2,
    MapPin,
    TrendingUp,
    Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Property } from '@/types/immo/property';

interface Props {
    property: Property;
    variant?: 'grid' | 'list';
    index?: number;
}

export function PropertyCard({ property, variant = 'grid', index = 0 }: Props) {
    const formattedPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: property.currency || 'EUR',
        maximumFractionDigits: 0,
    }).format(property.price);

    const isNew =
        new Date(property.created_at) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Animation props corrigées – easings compatibles TypeScript
    const animationProps: variants = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: {
            duration: 0.5,
            delay: index * 0.05,
            ease: 'backOut', //
        },
    };

    if (variant === 'list') {
        return (
            <motion.div {...animationProps}>
                <Card className="group relative mt-3 overflow-hidden rounded border-0 bg-white transition-all duration-500 dark:bg-slate-900">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image avec overlay */}
                        <div className="relative aspect-video shrink-0 overflow-hidden lg:aspect-square">
                            <Link
                                href={route('properties.show', property.slug)}
                            >
                                <img
                                    src={property.main_image}
                                    alt={property.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Badges flottants */}
                            <div className="absolute top-5 left-5 flex gap-2">
                                {property.is_verified && (
                                    <Badge className="rounded-xl border-0 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg backdrop-blur-md">
                                        <CheckCircle2 className="mr-1.5 h-3 w-3 text-teal-600" />
                                        Vérifié
                                    </Badge>
                                )}
                                {isNew && (
                                    <Badge className="rounded-xl border-0 bg-teal-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                                        <Calendar className="mr-1.5 h-3 w-3" />
                                        Nouveau
                                    </Badge>
                                )}
                            </div>
                            <div className="absolute top-5 right-5">
                                <Button
                                    size="icon"
                                    className="h-9 w-9 rounded-xl border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="flex flex-1 flex-col p-6 lg:p-8">
                            <div className="mb-4">
                                <Link
                                    href={route(
                                        'properties.show',
                                        property.slug,
                                    )}
                                >
                                    <h3 className="text-2xl leading-relaxed font-normal text-slate-900 transition-colors hover:text-teal-600 dark:text-white">
                                        {property.title}
                                    </h3>
                                </Link>
                                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <MapPin className="h-4 w-4" />
                                    {property.city?.name}, {property.address}
                                </p>
                            </div>

                            <div className="my-6 grid grid-cols-3 gap-6 border-y border-slate-100 py-6 dark:border-slate-800">
                                <div>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                                        {formattedPrice}
                                    </p>
                                    <p className="mt-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Budget
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                                        {property.area} m²
                                    </p>
                                    <p className="mt-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Surface
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                                        {property.bedrooms}
                                    </p>
                                    <p className="mt-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Chambres
                                    </p>
                                </div>
                            </div>

                            <p className="mb-6 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                                {property.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between gap-4">
                                <Button
                                    className="h-12 flex-1 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'properties.show',
                                            property.slug,
                                        )}
                                    >
                                        Découvrir
                                        <TrendingUp className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        );
    }

    // Version Grid
    return (
        <motion.div {...animationProps}>
            <Card className="group relative overflow-hidden rounded border-0 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900">
                <Link
                    href={route('properties.show', property.slug)}
                    className="relative mt-0 aspect-4/5 overflow-hidden"
                >
                    <img
                        src={property.main_image}
                        alt={property.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute top-5 right-5">
                        <Button
                            size="icon"
                            className="h-9 w-9 rounded-xl border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="absolute bottom-5 left-5 flex gap-2">
                        <Badge className="rounded-xl border-0 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:bg-white/90 dark:text-slate-900">
                            {property.type}
                        </Badge>
                        {property.is_verified && (
                            <Badge className="rounded-xl border-0 bg-teal-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Vérifié
                            </Badge>
                        )}
                    </div>
                </Link>

                <CardContent className="space-y-4 p-4">
                    <div>
                        <Link href={route('properties.show', property.slug)}>
                            <h3 className="truncate text-2xl font-bold text-slate-900 transition-colors hover:text-teal-600 dark:text-white">
                                {property.title}
                            </h3>
                        </Link>
                        <div className="mt-2 flex items-baseline justify-between">
                            <span className="text-[20px] font-bold text-teal-600 dark:text-teal-400">
                                {formattedPrice}
                            </span>
                            <span className="text-sm text-slate-400">
                                {property.area} m²
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{property.city?.name}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <Bed className="h-4 w-4 text-teal-500" />
                            <span>{property.bedrooms} ch.</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <Bath className="h-4 w-4 text-teal-500" />
                            <span>{property.bathrooms} sdb</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <Square className="h-4 w-4 text-teal-500" />
                            <span>{property.area} m²</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
