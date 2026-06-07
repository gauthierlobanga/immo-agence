/* eslint-disable react-hooks/static-components */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Star,
    Bed,
    Bath,
    Maximize,
    Home,
    Wifi,
    Car,
    ChefHat,
    Cigarette,
    Phone,
    Mail,
    ChevronRight,
    X,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Grid3X3,
    Camera,
    Sparkles,
    ArrowRight,
    LoaderIcon,
    Send,
    Loader2,
    BadgeDollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import AppPublicLayout from '@/layouts/app-public-layout';
import { SafeHtmlContent } from '@/lib/SafeHtmlContent';
import getToastStyle from '@/lib/toast-style';
import { cn } from '@/lib/utils';
import type { Property } from '@/types/immo/property';

// Icônes par équipement
const amenityIconMap: Record<string, any> = {
    wifi: Wifi,
    parking: Car,
    cuisine: ChefHat,
    fumeur: Cigarette,
    chambre: Bed,
    salle_de_bain: Bath,
    balcon: Home,
    piscine: Home,
    jardin: Home,
    ascenseur: Home,
    sécurité: Home,
};

interface Props {
    property: { data: Property };
    similarProperties: { data: Property[] };
}

// ---- Lightbox (inchangée) ----
function Lightbox({
    images,
    initialIndex = 0,
    onClose,
}: {
    images: { url: string; alt: string }[];
    initialIndex?: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(initialIndex);
    const goTo = (index: number) => {
        if (index >= 0 && index < images.length) {
            setCurrent(index);
        }
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prev();
        }

        if (e.key === 'ArrowRight') {
            next();
        }

        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
            >
                <X className="h-6 w-6" />
            </button>
            <div className="absolute top-5 left-5 z-10 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur">
                {current + 1} / {images.length}
            </div>
            <div
                className="flex h-full w-full items-center justify-center p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[current]?.url}
                    alt={images[current]?.alt}
                    className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                />
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                className="absolute top-1/2 left-5 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
                disabled={current === 0}
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                className="absolute top-1/2 right-5 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
                disabled={current === images.length - 1}
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-white/10 p-2 backdrop-blur">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            goTo(idx);
                        }}
                        className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                            idx === current
                                ? 'border-teal-400 opacity-100'
                                : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                        <img
                            src={img.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

// ---- Page principale ----
function PropertyShow({ property, similarProperties }: Props) {
    const p = property.data;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);

    const { data, setData, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: `${p.title}`,
    });

    const visitForm = useForm({
        name: '',
        email: '',
        phone: '',
        message: `${p.title}`,
    });

    // Formulaire d'offre
    const offerForm = useForm({
        amount: '',
        currency: 'USD',
        type: 'purchase',
        message: '',
    });

    const submitContact = (e: React.SubmitEvent) => {
        e.preventDefault();
        visitForm.post(route('properties.contact', p.id), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                visitForm.reset();
                toast.success('Demande envoyée !', {
                    description: "Votre message a été envoyé à l'agent.",
                    style: getToastStyle('success'),
                });
            },
            onError: () => {
                toast.error('Erreur dans le formulaire.', {
                    style: getToastStyle('error'),
                });
            },
        });
    };

    const submitOffer = (e: React.SubmitEvent) => {
        e.preventDefault();
        offerForm.post(route('offers.store', p.id), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                offerForm.reset();
                toast.success('Offre envoyée !', {
                    description: "Votre proposition a été transmise à l'agent.",
                    style: getToastStyle('success'),
                });
            },
            onError: () => {
                toast.error("Erreur lors de l'envoi de l'offre.", {
                    style: getToastStyle('error'),
                });
            },
        });
    };

    const formatPrice = (price: number, currency: string) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);

    // Features normalisées
    const featuresList: string[] = (() => {
        if (!p.features) {
            return [];
        }

        if (Array.isArray(p.features)) {
            return p.features;
        }

        try {
            const parsed = JSON.parse(p.features);

            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })();

    // Images (main + gallery)
    const allImages: { url: string; alt: string }[] = (() => {
        const images: { url: string; alt: string }[] = [];

        if (p.main_image) {
            images.push({ url: p.main_image, alt: p.title });
        }

        (p.images || []).forEach((img) => {
            if (img.url) {
                images.push({
                    url: img.url,
                    alt: img.alt || `${p.title} photo`,
                });
            }
        });

        return images;
    })();

    const mainImageUrl =
        allImages[0]?.url ||
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200';

    const openLightbox = (index: number) => {
        setInitialImageIndex(index);
        setLightboxOpen(true);
    };

    // Composant contenu riche (inchangé)
    const RichContentText = ({ content }: { content: string }) => {
        return (
            <div
                className="prose prose-sm dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mt-4 prose-h1:mb-4 prose-h1:text-2xl prose-h1:text-slate-900 dark:prose-h1:text-white prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-emerald-100 prose-h2:pb-2 prose-h2:text-xl dark:prose-h2:border-emerald-900/40 prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg prose-h3:text-slate-800 dark:prose-h3:text-slate-200 prose-p:mt-3 prose-p:mb-3 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:pl-4 prose-blockquote:text-slate-600 prose-blockquote:italic dark:prose-blockquote:border-emerald-600 dark:prose-blockquote:bg-slate-900/30 dark:prose-blockquote:text-slate-300 prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-emerald-700 dark:prose-code:bg-slate-800 dark:prose-code:text-emerald-400 prose-pre:my-6 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 dark:prose-pre:border-slate-800 dark:prose-pre:bg-slate-900/60 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-img:rounded-xl prose-img:shadow-md max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    };

    return (
        <>
            <Head title={p.title} />

            {/* HERO FULL WIDTH avec image principale et infos superposées */}
            <section className="relative h-125 w-full overflow-hidden lg:h-162.5">
                {/* Image de fond */}
                <img
                    src={mainImageUrl}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Overlay gradient sombre */}
                <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/50 to-slate-900/30" />

                {/* Contenu superposé */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <Badge className="mb-4 gap-1.5 border-teal-300 bg-teal-500/20 px-4 py-1.5 text-sm text-teal-100 backdrop-blur-sm">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    {p.type === 'maison'
                                        ? 'Maison'
                                        : p.type === 'appartement'
                                          ? 'Appartement'
                                          : p.type === 'terrain'
                                            ? 'Terrain'
                                            : p.type}
                                    {p.subtype && ` · ${p.subtype}`}
                                </Badge>
                                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                                    {p.title}
                                </h1>
                                <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-teal-300" />
                                        <span className="text-lg">
                                            {p.address}, {p.city?.name}
                                            {p.commune?.name
                                                ? `, ${p.commune.name}`
                                                : ''}
                                        </span>
                                    </div>
                                    {p.rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span>{p.rating}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                                    {p.bedrooms !== null &&
                                        p.bedrooms !== undefined && (
                                            <span className="flex items-center gap-1">
                                                <Bed className="h-4 w-4" />{' '}
                                                {p.bedrooms} ch.
                                            </span>
                                        )}
                                    {p.bathrooms !== null &&
                                        p.bathrooms !== undefined && (
                                            <span className="flex items-center gap-1">
                                                <Bath className="h-4 w-4" />{' '}
                                                {p.bathrooms} sdb
                                            </span>
                                        )}
                                    {p.area && (
                                        <span className="flex items-center gap-1">
                                            <Maximize className="h-4 w-4" />{' '}
                                            {p.area} m²
                                        </span>
                                    )}
                                    {p.land_area && (
                                        <span className="flex items-center gap-1">
                                            <Maximize className="h-4 w-4" />{' '}
                                            Terrain {p.land_area} m²
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="shrink-0 text-right">
                                <div className="text-4xl font-bold text-white lg:text-5xl">
                                    {formatPrice(p.price, p.currency)}
                                </div>
                                {p.price_negotiable && (
                                    <Badge className="mt-2 border border-yellow-400/30 bg-yellow-400/20 text-yellow-300">
                                        Prix négociable
                                    </Badge>
                                )}
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        className="bg-teal-600 text-white hover:bg-teal-700"
                                        asChild
                                    >
                                        <a href="#visit">
                                            Planifier une visite
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-white/30 text-white hover:bg-white/10"
                                        asChild
                                    >
                                        <Link href={route('properties.index')}>
                                            Voir d'autres biens
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-4 lg:py-8">
                {/* Breadcrumbs (inchangés) */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Link href="/" className="hover:text-teal-600">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link
                        href={route('properties.index')}
                        className="hover:text-teal-600"
                    >
                        Propriétés
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="truncate font-medium text-slate-900 dark:text-white">
                        {p.title}
                    </span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* ---- Main Content ---- */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Galerie interactive (inchangée) */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="relative col-span-3 aspect-4/3 overflow-hidden rounded-2xl md:col-span-2">
                                <img
                                    src={allImages[0]?.url}
                                    alt={allImages[0]?.alt}
                                    className="h-full w-full cursor-pointer object-cover transition hover:scale-105"
                                    onClick={() => openLightbox(0)}
                                />
                            </div>
                            <div className="col-span-3 grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-1">
                                {allImages.slice(1, 2).map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl"
                                        onClick={() => openLightbox(i + 1)}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt}
                                            className="h-full w-full object-cover transition hover:scale-105"
                                        />
                                    </div>
                                ))}
                                {allImages.length > 3 && (
                                    <div
                                        className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl"
                                        onClick={() => openLightbox(3)}
                                    >
                                        <img
                                            src={allImages[3]?.url}
                                            alt="Plus de photos"
                                            className="h-full w-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                            <span className="text-3xl font-bold text-white">
                                                +{allImages.length - 3}
                                            </span>
                                            <Camera className="absolute right-2 bottom-2 h-5 w-5 text-white/80" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description*/}
                        <RichContentText
                            content={
                                typeof p.description === 'string'
                                    ? p.description
                                    : JSON.stringify(p.description)
                            }
                        />

                        {/* Équipements (inchangé) */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Équipements & Caractéristiques
                            </h2>
                            <Card className="border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {featuresList.map((feature, index) => {
                                            const normalized = feature
                                                .toLowerCase()
                                                .replace(/\s+/g, '_');
                                            const Icon =
                                                amenityIconMap[normalized] ||
                                                Home;

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                                                >
                                                    <Icon className="h-4 w-4 text-teal-500" />
                                                    <span>{feature}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Détails (inchangé) */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Détails du bien
                            </h2>
                            <Card className="border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                                <CardContent className="divide-y text-sm [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:py-4">
                                    <div>
                                        <span className="text-slate-500">
                                            Statut
                                        </span>
                                        <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                            {p.status === 'available'
                                                ? 'Disponible'
                                                : p.status === 'pending'
                                                  ? 'En attente'
                                                  : p.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">
                                            Adresse
                                        </span>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">
                                            {p.address}, {p.city?.name},{' '}
                                            {p.commune?.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">
                                            Surface habitable
                                        </span>
                                        <span className="font-medium">
                                            {p.area} m²
                                        </span>
                                    </div>
                                    {p.land_area && (
                                        <div>
                                            <span className="text-slate-500">
                                                Terrain
                                            </span>
                                            <span className="font-medium">
                                                {p.land_area} m²
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-slate-500">
                                            Chambres
                                        </span>
                                        <span className="font-medium">
                                            {p.bedrooms}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">
                                            Salles de bain
                                        </span>
                                        <span className="font-medium">
                                            {p.bathrooms}
                                        </span>
                                    </div>
                                    {p.year_built && (
                                        <div>
                                            <span className="text-slate-500">
                                                Année
                                            </span>
                                            <span className="font-medium">
                                                {p.year_built}
                                            </span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* ---- Sidebar ---- */}
                    <div className="space-y-6">
                        {/* Carte Agent */}
                        <Card className="overflow-hidden border-slate-200 bg-white/80 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                            <CardContent className="space-y-6 p-6">
                                {/* Photo + infos */}
                                <div className="flex items-start gap-4">
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-teal-100 dark:ring-teal-900/50">
                                        <img
                                            src={
                                                p.agent?.avatar_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(p.agent?.name || 'Agent')}&background=0d9488&color=fff&size=128&bold=true`
                                            }
                                            alt={p.agent?.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {p.agent?.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {p.agent?.email}
                                        </p>
                                        <div className="mt-2 flex items-center gap-1">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                    />
                                                ),
                                            )}
                                            <span className="ml-1 text-xs text-slate-500">
                                                5.0 (12 avis)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Coordonnées */}
                                <div className="space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">
                                            Téléphone
                                        </span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {p.agent?.phone ? (
                                                <a
                                                    href={`tel:${p.agent.phone}`}
                                                    className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                                                >
                                                    {p.agent.phone}
                                                </a>
                                            ) : (
                                                '—'
                                            )}
                                        </span>
                                    </div>
                                    <Separator className="bg-slate-200 dark:bg-slate-700" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">
                                            Email
                                        </span>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            <a
                                                href={`mailto:${p.agent?.email}`}
                                                className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                                            >
                                                {p.agent?.email}
                                            </a>
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    {p.agent?.phone ? (
                                        <Button
                                            className="flex-1 bg-teal-600 text-white hover:bg-teal-700"
                                            asChild
                                        >
                                            <a href={`tel:${p.agent.phone}`}>
                                                <Phone className="mr-2 h-4 w-4" />
                                                Appeler
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button
                                            className="flex-1 cursor-not-allowed bg-slate-300 text-slate-500"
                                            disabled
                                        >
                                            <Phone className="mr-2 h-4 w-4" />
                                            Pas de téléphone
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-slate-200 dark:border-slate-700"
                                        asChild
                                    >
                                        <a href={`mailto:${p.agent?.email}`}>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Écrire
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Formulaire */}
                        <Card
                            className="border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
                            id="visit"
                        >
                            <CardHeader>
                                <CardTitle className="text-slate-900 dark:text-white">
                                    Planifier une visite
                                </CardTitle>
                                <CardDescription>
                                    Envoyez une demande à l'agent pour visiter
                                    ce bien.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={submitContact}
                                    className="space-y-5"
                                >
                                    {/* Champ Nom */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Nom complet{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            placeholder="Votre nom"
                                            className={`h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/20 ${
                                                errors.name
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : ''
                                            }`}
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Champ Email */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Email{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            type="email"
                                            placeholder="votre@email.com"
                                            className={`h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/20 ${
                                                errors.email
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : ''
                                            }`}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Champ Téléphone */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Téléphone
                                        </Label>
                                        <Input
                                            type="tel"
                                            placeholder="+243 123 456 789"
                                            className={`h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/20 ${
                                                errors.phone
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : ''
                                            }`}
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    {/* Champ Message */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Message{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            placeholder="Votre message..."
                                            rows={5}
                                            className={`rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/20 ${
                                                errors.message
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : ''
                                            }`}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    {/* Bouton d’envoi */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="h-12 w-full rounded-xl bg-teal-600 text-base font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="mr-2 h-5 w-5" />
                                                Envoyer la demande
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Formulaire d'offre */}
                        <Card className="overflow-hidden border-slate-200 bg-white/80 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                                    <BadgeDollarSign className="h-5 w-5 text-teal-500" />
                                    Faire une offre
                                </CardTitle>
                                <CardDescription>
                                    Proposez un prix pour ce bien.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={submitOffer}
                                    className="space-y-5"
                                >
                                    {/* Type d'offre */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Type{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            value={offerForm.data.type}
                                            onValueChange={(value) =>
                                                offerForm.setData('type', value)
                                            }
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'h-11 w-full rounded-xl border px-3 text-sm font-medium transition-all duration-200',
                                                    'border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur',
                                                    'hover:border-teal-300 hover:bg-white',
                                                    'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                                    'dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300',
                                                    'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                                    'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                                    offerForm.errors.type
                                                        ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                        : '',
                                                )}
                                            >
                                                <SelectValue placeholder="Choisir le type" />
                                            </SelectTrigger>
                                            <SelectContent
                                                position="popper"
                                                side="bottom"
                                                align="start"
                                                sideOffset={8}
                                                className={cn(
                                                    'rounded-xl border border-slate-200/80 bg-white/95 p-1 shadow-lg backdrop-blur-xl',
                                                    'dark:border-slate-800/80 dark:bg-slate-950/95',
                                                )}
                                            >
                                                <SelectItem
                                                    value="purchase"
                                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                                >
                                                    Achat
                                                </SelectItem>
                                                <SelectItem
                                                    value="rent"
                                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                                >
                                                    Location
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={offerForm.errors.type}
                                        />
                                    </div>

                                    {/* Devise */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Devise
                                        </Label>
                                        <Select
                                            value={offerForm.data.currency}
                                            onValueChange={(value) =>
                                                offerForm.setData(
                                                    'currency',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'h-11 w-full rounded-xl border px-3 text-sm font-medium transition-all duration-200',
                                                    'border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur',
                                                    'hover:border-teal-300 hover:bg-white',
                                                    'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                                    'dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300',
                                                    'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                                    'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                                    offerForm.errors.currency
                                                        ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                        : '',
                                                )}
                                            >
                                                <SelectValue placeholder="Choisir la devise" />
                                            </SelectTrigger>
                                            <SelectContent
                                                position="popper"
                                                side="bottom"
                                                align="start"
                                                sideOffset={8}
                                                className={cn(
                                                    'rounded-xl border border-slate-200/80 bg-white/95 p-1 shadow-lg backdrop-blur-xl',
                                                    'dark:border-slate-800/80 dark:bg-slate-950/95',
                                                )}
                                            >
                                                <SelectItem
                                                    value="USD"
                                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                                >
                                                    USD
                                                </SelectItem>
                                                <SelectItem
                                                    value="CDF"
                                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                                >
                                                    CDF
                                                </SelectItem>
                                                <SelectItem
                                                    value="EUR"
                                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                                >
                                                    EUR
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={offerForm.errors.currency}
                                        />
                                    </div>

                                    {/* Montant */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Montant{' '}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            type="number"
                                            placeholder="Ex: 150000"
                                            value={offerForm.data.amount}
                                            onChange={(e) =>
                                                offerForm.setData(
                                                    'amount',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn(
                                                'h-11 w-full rounded-xl border px-3 text-sm font-medium transition-all duration-200',
                                                'border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur',
                                                'hover:border-teal-300 hover:bg-white',
                                                'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                                'dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300',
                                                'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                                'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                                offerForm.errors.amount
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : '',
                                            )}
                                        />
                                        <InputError
                                            message={offerForm.errors.amount}
                                        />
                                    </div>

                                    {/* Message optionnel */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Message
                                        </Label>
                                        <Textarea
                                            rows={3}
                                            placeholder="Ajoutez un message..."
                                            value={offerForm.data.message}
                                            onChange={(e) =>
                                                offerForm.setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn(
                                                'w-full rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200',
                                                'border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur',
                                                'hover:border-teal-300 hover:bg-white',
                                                'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                                'dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300',
                                                'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                                'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                                offerForm.errors.message
                                                    ? 'border-red-400 focus:border-red-500 dark:border-red-500'
                                                    : '',
                                            )}
                                        />
                                        <InputError
                                            message={offerForm.errors.message}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="h-12 w-full rounded-xl bg-teal-600 text-base font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                        disabled={offerForm.processing}
                                    >
                                        {offerForm.processing ? (
                                            <>
                                                <LoaderIcon className="h-6 w-6 animate-spin" />{' '}
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-6 w-6" />{' '}
                                                 Envoyer l'offre
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                        {/* Similaires */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Propriétés similaires
                                <Link
                                    href={route('properties.index')}
                                    className="ml-2 text-sm text-teal-600 hover:underline"
                                >
                                    Voir tout
                                </Link>
                            </h3>
                            {similarProperties.data.map((sim) => (
                                <Link
                                    key={sim.id}
                                    href={route('properties.show', sim.slug)}
                                    className="group flex gap-4 rounded-2xl border border-slate-200 bg-white/80 p-3 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                                >
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                                        <img
                                            src={sim.main_image}
                                            alt={sim.title}
                                            className="h-full w-full object-cover transition group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="truncate font-bold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                                            {sim.title}
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            {sim.city?.name}
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-teal-600">
                                            {formatPrice(
                                                sim.price,
                                                sim.currency,
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lightbox (inchangée) */}
                <AnimatePresence>
                    {lightboxOpen && (
                        <Lightbox
                            images={allImages}
                            initialIndex={initialImageIndex}
                            onClose={() => setLightboxOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

PropertyShow.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);

export default PropertyShow;
