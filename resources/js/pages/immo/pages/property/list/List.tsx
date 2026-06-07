/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    LayoutGrid,
    List as ListIcon,
    RotateCcw,
    SlidersHorizontal,
    X,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    FilterX,
    Sparkles,
    Home,
    BedDouble,
    MapPinHouse,
    Loader2,
} from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';
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
} from '@/components/ui/sheet'; // <-- Ajout de Sheet
import { Slider } from '@/components/ui/slider';
import AppPublicLayout from '@/layouts/app-public-layout';
import type { Property } from '@/types/immo/property';

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

function PropertyList({ properties, filters, communes, propertyTypes }: Props) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const safeFilters = useMemo(() => filters ?? {}, [filters]);

    // Tous les états des filtres
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

    // Scroll listener pour compacter la barre
    useEffect(() => {
        const onScroll = () => setIsCompact(window.scrollY > 200);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Compteur de filtres actifs
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

    // Construction des paramètres de filtre (utilisé aussi pour la pagination)
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

    // Appliquer les filtres
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

    // Debounce recherche
    useEffect(() => {
        const timeout = setTimeout(() => applyFilters(), 500);

        return () => clearTimeout(timeout);
    }, [search, applyFilters]);

    // Appliquer automatiquement les autres filtres
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

    // Réinitialiser tous les filtres
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

    // Pagination avec conservation des filtres
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
            <div className="flex items-center justify-center gap-2 pt-8">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
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
                            className={`min-w-10 rounded-full ${page === currentPage ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                            onClick={() => handlePageChange(Number(page))}
                        >
                            {page}
                        </Button>
                    ),
                )}
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
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
            <Head title="Propriétés" />

            {/* HERO FULL WIDTH */}
            <section className="relative h-125 w-full overflow-hidden lg:h-150">
                <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200"
                    alt="Maison moderne"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/50 to-slate-900/30" />
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <Badge className="gap-1.5 border-teal-300 bg-teal-500/20 px-4 py-1.5 text-sm text-teal-100 backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            {properties.meta.total} biens disponibles
                        </Badge>
                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Trouvez votre{' '}
                            <span className="text-teal-300">bien idéal</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-slate-200">
                            Maisons, appartements, terrains… à Kinshasa et dans
                            toute la RDC.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative mt-8 max-w-lg"
                        >
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-300" />
                            <Input
                                placeholder="Ville, adresse, mot-clé..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-14 rounded-xl border border-white/20 bg-white/10 pr-4 pl-12 text-white backdrop-blur-sm placeholder:text-slate-300 focus:border-transparent focus:ring-2 focus:ring-teal-400"
                            />
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* BARRE DE FILTRES STICKY INTELLIGENTE */}
            <div
                className={`sticky top-0 z-30 transition-all duration-500 ${
                    isCompact ? 'py-2' : 'py-4'
                } border-b border-slate-200/60 bg-white/70 shadow-[0_8px_40px_rgba(0,0,0,.08)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70`}
            >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-20 left-1/4 h-40 w-96 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/5" />
                </div>

                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            {activeFiltersCount > 0 && (
                                <Badge className="gap-1 bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                    {activeFiltersCount} filtre
                                    {activeFiltersCount > 1 ? 's' : ''}
                                </Badge>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filtres
                            </Button>
                        </div>

                        <motion.div
                            animate={{
                                opacity: isCompact ? 0 : 1,
                                height: isCompact ? 0 : 'auto',
                            }}
                            className="hidden flex-1 items-center gap-4 overflow-hidden lg:flex"
                        >
                            <div className="flex gap-1">
                                {['Tous', ...propertyTypes].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() =>
                                            setType(t === 'Tous' ? '' : t)
                                        }
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                            (t === 'Tous' && !type) ||
                                            type === t
                                                ? 'bg-teal-600 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="flex gap-1">
                                {['1', '2', '3', '4', '5+'].map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => toggleBedroom(b)}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                            bedrooms.includes(b)
                                                ? 'bg-teal-600 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {b} ch.
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-3">
                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger className="h-9 w-40 rounded-xl border-slate-200 bg-white/80 text-sm backdrop-blur-sm">
                                    <ArrowUpDown className="mr-2 h-4 w-4 text-slate-500" />
                                    <SelectValue placeholder="Trier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="created_at">
                                        Nouveautés
                                    </SelectItem>
                                    <SelectItem value="price">Prix</SelectItem>
                                    <SelectItem value="views_count">
                                        Les plus vus
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <motion.div
                                layout
                                className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"
                            >
                                <Button
                                    variant={
                                        view === 'grid' ? 'default' : 'ghost'
                                    }
                                    size="icon"
                                    className={`h-8 w-8 rounded-lg transition-all ${view === 'grid' ? 'bg-teal-600 text-white shadow-md' : ''}`}
                                    onClick={() => setView('grid')}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={
                                        view === 'list' ? 'default' : 'ghost'
                                    }
                                    size="icon"
                                    className={`h-8 w-8 rounded-lg transition-all ${view === 'list' ? 'bg-teal-600 text-white shadow-md' : ''}`}
                                    onClick={() => setView('list')}
                                >
                                    <ListIcon className="h-4 w-4" />
                                </Button>
                            </motion.div>

                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500"
                                    onClick={clearAllFilters}
                                >
                                    <FilterX className="mr-1 h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Réinitialiser
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* DRAWER MOBILE FULLSCREEN */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetContent
                    side="bottom"
                    className="h-[90vh] rounded-t-3xl p-0"
                >
                    <div className="flex h-full flex-col">
                        <SheetHeader className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                            <SheetTitle className="text-lg font-semibold">
                                Filtres
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
                            {/* Types */}
                            <div>
                                <Label className="text-sm font-medium">
                                    Type de bien
                                </Label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {['Tous', ...propertyTypes].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() =>
                                                setType(t === 'Tous' ? '' : t)
                                            }
                                            className={`rounded-full px-3.5 py-2 text-sm ${(t === 'Tous' && !type) || type === t ? 'bg-teal-600 text-white' : 'border'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Budget */}
                            <div>
                                <Label className="text-sm font-medium">
                                    Budget
                                </Label>
                                <Slider
                                    value={[
                                        minPrice ? Number(minPrice) : 0,
                                        maxPrice ? Number(maxPrice) : 500000,
                                    ]}
                                    onValueChange={([min, max]) => {
                                        setMinPrice(String(min));
                                        setMaxPrice(String(max));
                                    }}
                                    min={0}
                                    max={500000}
                                    step={1000}
                                    className="mt-4"
                                />
                                <div className="mt-1 flex justify-between text-xs text-slate-500">
                                    <span>
                                        {formatPrice(
                                            minPrice ? Number(minPrice) : 0,
                                            'USD',
                                        )}
                                    </span>
                                    <span>
                                        {formatPrice(
                                            maxPrice
                                                ? Number(maxPrice)
                                                : 500000,
                                            'USD',
                                        )}
                                    </span>
                                </div>
                            </div>
                            {/* Surface */}
                            <div>
                                <Label className="text-sm font-medium">
                                    Surface (m²)
                                </Label>
                                <Slider
                                    value={[
                                        areaMin ? Number(areaMin) : 0,
                                        areaMax ? Number(areaMax) : 500,
                                    ]}
                                    onValueChange={([min, max]) => {
                                        setAreaMin(String(min));
                                        setAreaMax(String(max));
                                    }}
                                    min={0}
                                    max={500}
                                    step={5}
                                    className="mt-4"
                                />
                                <div className="mt-1 flex justify-between text-xs text-slate-500">
                                    <span>{areaMin || 0} m²</span>
                                    <span>{areaMax || 500} m²</span>
                                </div>
                            </div>
                            {/* Équipements */}
                            <div>
                                <Label className="text-sm font-medium">
                                    Équipements
                                </Label>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={hasParking}
                                            onChange={(e) =>
                                                setHasParking(e.target.checked)
                                            }
                                            className="rounded"
                                        />
                                        Parking
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={hasPool}
                                            onChange={(e) =>
                                                setHasPool(e.target.checked)
                                            }
                                            className="rounded"
                                        />
                                        Piscine
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={hasElevator}
                                            onChange={(e) =>
                                                setHasElevator(e.target.checked)
                                            }
                                            className="rounded"
                                        />
                                        Ascenseur
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={hasGarden}
                                            onChange={(e) =>
                                                setHasGarden(e.target.checked)
                                            }
                                            className="rounded"
                                        />
                                        Jardin
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-xl"
                                onClick={clearAllFilters}
                            >
                                Effacer
                            </Button>
                            <Button
                                className="flex-1 rounded-xl bg-teal-600 hover:bg-teal-700"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                Voir les résultats
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Indicateur de chargement */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-x-0 top-16 z-40 flex justify-center"
                    >
                        <div className="mt-2 rounded-full bg-teal-600 px-4 py-1 text-xs text-white shadow-lg">
                            <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />{' '}
                            Mise à jour...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Liste des propriétés */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                {properties.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                            <Search className="h-10 w-10" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                            Aucun bien trouvé
                        </h3>
                        <p className="max-w-md text-slate-500">
                            Essayez d'élargir votre recherche.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-6 rounded-full"
                            onClick={clearAllFilters}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" /> Réinitialiser
                            les filtres
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className={
                            view === 'grid'
                                ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                                : 'flex flex-col gap-4'
                        }
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
            </div>
        </>
    );
}

PropertyList.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);
export default PropertyList;
