/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Search,
    LayoutGrid,
    List as ListIcon,
    RotateCcw,
    SlidersHorizontal,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    FilterX,
    Sparkles,
    CheckCircle,
    Home,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PropertyCard } from '@/components/immo/property/property-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import AppPublicLayout from '@/layouts/app-public-layout';
import { cn } from '@/lib/utils';
import type { Property } from '@/types/immo/property';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    properties: {
        data: Property[];
        meta: {
            total: number;
            last_page: number;
            current_page: number;
            per_page: number;
        };
        links: any[];
    };
    filters: Record<string, any> | null;
    communes: Array<{ id: number; name: string }>;
    propertyTypes: string[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function PropertySkeleton({ variant = 'grid' }: { variant?: 'grid' | 'list' }) {
    if (variant === 'list') {
        return (
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col lg:flex-row">
                    <div className="aspect-video shrink-0 animate-pulse bg-slate-200 lg:aspect-square lg:w-110 dark:bg-slate-800" />
                    <div className="flex flex-1 flex-col p-8 lg:p-12">
                        <div className="space-y-4">
                            <div className="h-10 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                            <div className="h-6 w-1/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-8 border-y border-slate-100 py-8 dark:border-slate-800">
                            <div className="space-y-3">
                                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                            </div>
                        </div>
                        <div className="mt-auto flex justify-between pt-8">
                            <div className="h-16 w-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                            <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="aspect-4/5 animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-6 p-8 lg:p-10">
                <div className="space-y-3">
                    <div className="h-8 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-12 w-2/3 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                    <div className="h-6 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-6 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
            </div>
        </div>
    );
}

function PropertyList({ properties, filters, communes, propertyTypes }: Props) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const safeFilters = useMemo(() => filters ?? {}, [filters]);

    const [search, setSearch] = useState(safeFilters.search ?? '');
    const [type, setType] = useState(safeFilters.type ?? '');
    const [bedrooms, setBedrooms] = useState<string[]>(() =>
        safeFilters.bedrooms ? String(safeFilters.bedrooms).split(',') : [],
    );
    const [minPrice, setMinPrice] = useState(safeFilters.min_price ?? '');
    const [maxPrice, setMaxPrice] = useState(safeFilters.max_price ?? '');
    const [communeId, setCommuneId] = useState<string[]>(() =>
        safeFilters.commune_id ? String(safeFilters.commune_id).split(',') : [],
    );
    const [areaMin, setAreaMin] = useState(safeFilters.area_min ?? '');
    const [areaMax, setAreaMax] = useState(safeFilters.area_max ?? '');
    const [hasParking, setHasParking] = useState(
        safeFilters.has_parking === '1',
    );
    const [hasPool, setHasPool] = useState(safeFilters.has_pool === '1');
    const [hasElevator, setHasElevator] = useState(
        safeFilters.has_elevator === '1',
    );
    const [hasGarden, setHasGarden] = useState(safeFilters.has_garden === '1');
    const [sort, setSort] = useState(safeFilters.sort ?? 'created_at');
    const [isLoading, setIsLoading] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);

    const [openSections, setOpenSections] = useState({
        budget: true,
        bedrooms: true,
        options: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Dans le useEffect qui gère le scroll
    useEffect(() => {
        // Animation GSAP pour les cartes (stagger)
        if (listRef.current && properties.data.length > 0) {
            gsap.fromTo(
                '.property-card-animate',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.7,
                    ease: 'back.out(0.8)',
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: 'top 80%',
                    },
                },
            );
        }

        // Animation de la barre de filtre sticky
        const filterBar = document.querySelector('.filter-bar');

        if (filterBar) {
            ScrollTrigger.create({
                trigger: filterBar,
                start: 'top top',
                endTrigger: 'body',
                end: 'bottom top',
                pin: false,
                toggleClass: {
                    targets: filterBar,
                    className: 'shadow-xl backdrop-blur-xl',
                },
                onEnter: () =>
                    filterBar.classList.add(
                        'bg-white/80',
                        'dark:bg-slate-950/80',
                    ),
                onLeaveBack: () =>
                    filterBar.classList.remove(
                        'bg-white/80',
                        'dark:bg-slate-950/80',
                    ),
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [properties.data.length]);

    useEffect(() => {
        const onScroll = () => setIsCompact(window.scrollY > 150);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const activeFiltersCount = useMemo(() => {
        let count = 0;

        if (type) {
            count++;
        }

        if (bedrooms.length) {
            count++;
        }

        if (minPrice || maxPrice) {
            count++;
        }

        if (areaMin || areaMax) {
            count++;
        }

        if (hasParking) {
            count++;
        }

        if (hasPool) {
            count++;
        }

        if (hasElevator) {
            count++;
        }

        if (hasGarden) {
            count++;
        }

        return count;
    }, [
        type,
        bedrooms,
        minPrice,
        maxPrice,
        areaMin,
        areaMax,
        hasParking,
        hasPool,
        hasElevator,
        hasGarden,
    ]);

    const buildParams = useCallback(
        (page?: number) => {
            const params: Record<string, any> = {};

            if (search) {
                params.search = search;
            }

            if (type) {
                params.type = type;
            }

            if (bedrooms.length) {
                params.bedrooms = bedrooms.join(',');
            }

            if (minPrice) {
                params.min_price = minPrice;
            }

            if (maxPrice) {
                params.max_price = maxPrice;
            }

            if (areaMin) {
                params.area_min = areaMin;
            }

            if (areaMax) {
                params.area_max = areaMax;
            }

            if (hasParking) {
                params.has_parking = '1';
            }

            if (hasPool) {
                params.has_pool = '1';
            }

            if (hasElevator) {
                params.has_elevator = '1';
            }

            if (hasGarden) {
                params.has_garden = '1';
            }

            if (communeId.length) {
                params.commune_id = communeId.join(',');
            }

            params.sort = sort;

            if (page && page > 1) {
                params.page = page;
            }

            return params;
        },
        [
            search,
            type,
            bedrooms,
            minPrice,
            maxPrice,
            areaMin,
            areaMax,
            hasParking,
            hasPool,
            hasElevator,
            hasGarden,
            communeId,
            sort,
        ],
    );

    const applyFilters = useCallback(() => {
        router.get(route('properties.index'), buildParams(), {
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
            replace: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    }, [buildParams]);

    useEffect(() => {
        const timeout = setTimeout(() => applyFilters(), 500);

        return () => clearTimeout(timeout);
    }, [search, applyFilters]);

    useEffect(() => {
        applyFilters();
    }, [
        type,
        bedrooms,
        minPrice,
        maxPrice,
        areaMin,
        areaMax,
        hasParking,
        hasPool,
        hasElevator,
        hasGarden,
        communeId,
        sort,
        applyFilters,
    ]);

    const clearAllFilters = () => {
        setSearch('');
        setType('');
        setBedrooms([]);
        setMinPrice('');
        setMaxPrice('');
        setAreaMin('');
        setAreaMax('');
        setHasParking(false);
        setHasPool(false);
        setHasElevator(false);
        setHasGarden(false);
        setCommuneId([]);
        setSort('created_at');
    };

    const toggleBedroom = (value: string) =>
        setBedrooms((prev) =>
            prev.includes(value)
                ? prev.filter((b) => b !== value)
                : [...prev, value],
        );

    const formatPrice = (price: number, currency: string) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
        }).format(price);

    const currentPage = properties.meta.current_page;
    const lastPage = properties.meta.last_page;

    const handlePageChange = (page: number) => {
        router.get(route('properties.index'), buildParams(page), {
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
            replace: true,
        });
    };

    const renderPagination = () => {
        if (lastPage <= 1) {
            return null;
        }

        const pages: (number | string)[] = [];
        const delta = 2;

        for (let i = 1; i <= lastPage; i++) {
            if (
                i === 1 ||
                i === lastPage ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }

        return (
            <div className="flex items-center justify-center gap-2 pt-12">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-slate-200 dark:border-slate-800"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {pages.map((page, idx) =>
                    page === '...' ? (
                        <span key={`e-${idx}`} className="px-2 text-slate-400">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={
                                page === currentPage ? 'default' : 'outline'
                            }
                            size="sm"
                            className={`min-w-10 rounded-full transition-all ${
                                page === currentPage
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-500/20 hover:bg-slate-800'
                                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900'
                            }`}
                            onClick={() => handlePageChange(Number(page))}
                        >
                            {page}
                        </Button>
                    ),
                )}
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-slate-200 dark:border-slate-800"
                    disabled={currentPage === lastPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    return (
        <>
            <Head title="Propriétés d'Exception - Immo" />

            {/* HERO SECTION PREMIUM */}
            <section className="relative flex min-h-[40vh] w-full items-center overflow-hidden bg-slate-950 py-20 lg:min-h-[50vh]">
                {/* Background artistique */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
                        alt="Background"
                        className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />

                    {/* Éléments de design flottants */}
                    <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-slate-500/10 blur-[120px]" />
                    <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md"
                        >
                            <Sparkles className="h-4 w-4 text-primary" />
                            Collection Exclusive
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl"
                        >
                            Découvrez des lieux <br />
                            <span>extraordinaires.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-xl text-slate-400"
                        >
                            Plus de {properties.meta.total} propriétés de luxe
                            soigneusement sélectionnées pour vous.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative mt-10 max-w-2xl"
                        >
                            <div className="group relative">
                                <div className="absolute -inset-1 rounded-2xl bg-white/20 opacity-0 blur-xl transition-all duration-500 group-focus-within:opacity-100" />
                                <div className="relative flex items-center overflow-hidden rounded-2xl bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur-2xl">
                                    <div className="flex flex-1 items-center px-4">
                                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-white" />
                                        <Input
                                            placeholder="Ville, quartier, mot-clé..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="h-12 border-0 bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                    <Button className="h-12 rounded-xl bg-white px-6 font-bold text-slate-900 hover:bg-slate-100">
                                        Rechercher
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STICKY FILTER BAR PRO */}
            <div
                className={cn(
                    'sticky top-0 z-40 transition-all duration-500',
                    isCompact
                        ? 'border-b border-slate-200 bg-white/80 py-3 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80'
                        : 'bg-transparent py-6',
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="rounded-2xl border-slate-200 bg-white shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4 text-slate-600" />
                                Filtres
                                {activeFiltersCount > 0 && (
                                    <Badge className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 p-0 text-[10px] text-white">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>

                            <div className="hidden items-center gap-2 lg:flex">
                                <AnimatePresence mode="wait">
                                    {!isCompact ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-2"
                                        >
                                            {['Tous', ...propertyTypes].map(
                                                (t) => (
                                                    <button
                                                        key={t}
                                                        onClick={() =>
                                                            setType(
                                                                t === 'Tous'
                                                                    ? ''
                                                                    : t,
                                                            )
                                                        }
                                                        className={cn(
                                                            'rounded-xl px-4 py-2 text-sm font-bold transition-all',
                                                            (t === 'Tous' &&
                                                                !type) ||
                                                                type === t
                                                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-500/20'
                                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                                                        )}
                                                    >
                                                        {t}
                                                    </button>
                                                ),
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                                                <Home className="h-5 w-5" />
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                Immo Premium
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger className="h-11 w-48 rounded-xl border-slate-200 bg-white font-bold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                                    <ArrowUpDown className="mr-2 h-4 w-4 text-slate-500" />
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-slate-200/60 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/95">
                                    <SelectItem
                                        value="created_at"
                                        className="rounded-xl focus:bg-slate-50 dark:focus:bg-slate-900/30"
                                    >
                                        Nouveautés
                                    </SelectItem>
                                    <SelectItem
                                        value="price_asc"
                                        className="rounded-xl focus:bg-slate-50 dark:focus:bg-slate-900/30"
                                    >
                                        Prix croissant
                                    </SelectItem>
                                    <SelectItem
                                        value="price_desc"
                                        className="rounded-xl focus:bg-slate-50 dark:focus:bg-slate-900/30"
                                    >
                                        Prix décroissant
                                    </SelectItem>
                                    <SelectItem
                                        value="views_count"
                                        className="rounded-xl focus:bg-slate-50 dark:focus:bg-slate-900/30"
                                    >
                                        Les plus consultés
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        'h-9 w-9 rounded-xl transition-all',
                                        view === 'grid'
                                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                            : 'text-slate-500',
                                    )}
                                    onClick={() => setView('grid')}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        'h-9 w-9 rounded-xl transition-all',
                                        view === 'list'
                                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                            : 'text-slate-500',
                                    )}
                                    onClick={() => setView('list')}
                                >
                                    <ListIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN LIST CONTENT */}
            <main
                ref={listRef}
                className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8"
            >
                {isLoading ? (
                    <div
                        className={cn(
                            'grid grid-cols-1 gap-4',
                            view === 'grid'
                                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : '',
                        )}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <PropertySkeleton key={i} variant={view} />
                        ))}
                    </div>
                ) : properties.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 rounded-full bg-slate-500/10 blur-[80px]" />
                            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white shadow-2xl dark:bg-slate-900">
                                <Search className="h-12 w-12 text-slate-400" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                            Aucun bien trouvé
                        </h3>
                        <p className="mt-4 max-w-md text-lg text-slate-500">
                            Essayez d'ajuster vos filtres pour trouver ce que
                            vous cherchez.
                        </p>
                        <Button
                            onClick={clearAllFilters}
                            className="mt-10 rounded-2xl bg-slate-900 px-8 py-6 text-lg font-bold text-white hover:bg-slate-800"
                        >
                            <RotateCcw className="mr-2 h-5 w-5" />
                            Réinitialiser
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className={cn(
                            'grid grid-cols-1 gap-4',
                            view === 'grid'
                                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'flex flex-col gap-4',
                        )}
                    >
                        {properties.data.map((property) => (
                            <motion.div
                                key={property.id}
                                variants={itemVariants}
                            >
                                <PropertyCard
                                    property={property}
                                    variant={view}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {renderPagination()}
            </main>

            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetContent
                    side="bottom"
                    className="h-[85vh] rounded-t-[2.5rem] border-t-0 bg-white/95 p-0 backdrop-blur-xl dark:bg-slate-950/95"
                >
                    <div className="flex h-full flex-col">
                        <SheetHeader className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                            <SheetTitle className="text-2xl font-black text-slate-900 dark:text-white">
                                Filtrer les biens
                            </SheetTitle>
                            <p className="text-sm text-slate-500">
                                Affinez votre recherche
                            </p>
                        </SheetHeader>

                        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-4">
                            {/* Budget Section avec accordéon */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => toggleSection('budget')}
                                    className="flex w-full items-center justify-between text-left text-lg font-bold text-slate-900 transition-colors dark:text-white"
                                >
                                    Budget (USD)
                                    {openSections.budget ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openSections.budget && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                            <Slider
                                                value={[
                                                    minPrice
                                                        ? Number(minPrice)
                                                        : 0,
                                                    maxPrice
                                                        ? Number(maxPrice)
                                                        : 500000,
                                                ]}
                                                onValueChange={([min, max]) => {
                                                    setMinPrice(String(min));
                                                    setMaxPrice(String(max));
                                                }}
                                                min={0}
                                                max={500000}
                                                step={1000}
                                                className="py-2"
                                            />
                                            <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                                                <span>
                                                    {formatPrice(
                                                        Number(minPrice) || 0,
                                                        'USD',
                                                    )}
                                                </span>
                                                <span>
                                                    {formatPrice(
                                                        Number(maxPrice) ||
                                                            500000,
                                                        'USD',
                                                    )}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Chambres Section */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => toggleSection('bedrooms')}
                                    className="flex w-full items-center justify-between text-left text-lg font-bold text-slate-900 dark:text-white"
                                >
                                    Nombre de chambres
                                    {openSections.bedrooms ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openSections.bedrooms && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-5 gap-2 overflow-hidden pt-2"
                                        >
                                            {['1', '2', '3', '4', '5+'].map(
                                                (num) => (
                                                    <button
                                                        key={num}
                                                        onClick={() =>
                                                            toggleBedroom(num)
                                                        }
                                                        className={cn(
                                                            'h-12 rounded-xl border-2 font-bold transition-all',
                                                            bedrooms.includes(
                                                                num,
                                                            )
                                                                ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                                                                : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400',
                                                        )}
                                                    >
                                                        {num}
                                                    </button>
                                                ),
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Options Section */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => toggleSection('options')}
                                    className="flex w-full items-center justify-between text-left text-lg font-bold text-slate-900 dark:text-white"
                                >
                                    Équipements
                                    {openSections.options ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openSections.options && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-2 gap-3 overflow-hidden pt-2"
                                        >
                                            {[
                                                {
                                                    label: 'Parking',
                                                    state: hasParking,
                                                    set: setHasParking,
                                                },
                                                {
                                                    label: 'Piscine',
                                                    state: hasPool,
                                                    set: setHasPool,
                                                },
                                                {
                                                    label: 'Ascenseur',
                                                    state: hasElevator,
                                                    set: setHasElevator,
                                                },
                                                {
                                                    label: 'Jardin',
                                                    state: hasGarden,
                                                    set: setHasGarden,
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() =>
                                                        item.set(!item.state)
                                                    }
                                                    className={cn(
                                                        'flex items-center justify-center gap-2 rounded-xl border-2 p-3 font-medium transition-all',
                                                        item.state
                                                            ? 'border-teal-500 bg-teal-50 text-teal-700 dark:border-teal-400 dark:bg-teal-950 dark:text-teal-300'
                                                            : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400',
                                                    )}
                                                >
                                                    {item.state && (
                                                        <CheckCircle className="h-4 w-4" />
                                                    )}
                                                    {item.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Actions flottantes */}
                        <div className="relative border-t border-slate-100 bg-white/80 px-6 py-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    className="h-12 flex-1 rounded-xl border-slate-200 font-bold dark:border-slate-800"
                                    onClick={clearAllFilters}
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Réinitialiser
                                </Button>
                                <Button
                                    className="h-12 flex-2 rounded-xl bg-slate-900 font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    Appliquer ({activeFiltersCount})
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

PropertyList.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);
export default PropertyList;
