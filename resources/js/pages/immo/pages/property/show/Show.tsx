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
} from 'lucide-react';
import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import AppPublicLayout from '@/layouts/app-public-layout';
import { SafeHtmlContent } from '@/lib/SafeHtmlContent';
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

// ---- Composant Lightbox (ajouté) ----
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

    // Key listeners
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
            {/* Fermer */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
            >
                <X className="h-6 w-6" />
            </button>

            {/* Compteur */}
            <div className="absolute top-5 left-5 z-10 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur">
                {current + 1} / {images.length}
            </div>

            {/* Image actuelle */}
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

            {/* Flèches */}
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

            {/* Miniatures en bas */}
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

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        message: `Je suis intéressé par votre propriété : ${p.title}`,
    });

    const submitContact = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('properties.contact', p.slug));
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

        // Image principale
        if (p.main_image) {
            images.push({ url: p.main_image, alt: p.title });
        }

        // Gallery
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

    // Composant contenu riche avec style amélioré
    const RichContentText = ({ content }: { content: string }) => {
        return (
            <div
                className="prose prose-sm dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mt-4 prose-h1:mb-4 prose-h1:text-2xl prose-h1:text-slate-900 dark:prose-h1:text-white prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-emerald-100 prose-h2:pb-2 prose-h2:text-xl dark:prose-h2:border-emerald-900/40 prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg prose-h3:text-slate-800 dark:prose-h3:text-slate-200 prose-p:mt-3 prose-p:mb-3 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-emerald-400 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:pl-4 prose-blockquote:text-slate-600 prose-blockquote:italic dark:prose-blockquote:border-emerald-600 dark:prose-blockquote:bg-slate-900/30 dark:prose-blockquote:text-slate-300 prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-emerald-700 dark:prose-code:bg-slate-800 dark:prose-code:text-emerald-400 prose-pre:my-6 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 dark:prose-pre:border-slate-800 dark:prose-pre:bg-slate-900/60 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-img:rounded-xl prose-img:shadow-md max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    };

    // Ouvrir la lightbox à l'index choisi
    const openLightbox = (index: number) => {
        setInitialImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <Head title={p.title} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-700 to-slate-800 dark:from-teal-900 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-slate-900/20 blur-3xl dark:bg-white/5" />
                <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                            Trouvez votre bien idéal
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-teal-100">
                            Parcourez notre sélection de propriétés.
                        </p>
                    </motion.div>
                </div>
            </section>
            <div className="mx-auto max-w-6xl px-4 py-4 lg:py-8">
                {/* Breadcrumbs */}
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
                        {/* Galerie interactive */}
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

                        {/* Infos principales */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl dark:text-white">
                                    {p.title}
                                </h1>
                                <div className="text-3xl font-semibold text-teal-600">
                                    {formatPrice(p.price, p.currency)}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-teal-500" />
                                    <span>
                                        {p.address}, {p.city?.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{p.rating || '4.9'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <RichContentText
                            content={
                                typeof p.description === 'string'
                                    ? p.description
                                    : JSON.stringify(p.description)
                            }
                        />

                        {/* Équipements */}
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

                        {/* Détails */}
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
                                            {p.status}
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
                        {/* Agent */}
                        <Card className="border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                                        <img
                                            src={
                                                p.agent?.avatar_url ||
                                                `https://ui-avatars.com/api/?name=${p.agent?.name}`
                                            }
                                            alt={p.agent?.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {p.agent?.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {p.agent?.phone || p.agent?.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Téléphone
                                        </span>
                                        <span className="font-medium">
                                            {p.agent?.phone || '—'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">
                                            Email
                                        </span>
                                        <span className="font-medium">
                                            {p.agent?.email}
                                        </span>
                                    </div>
                                </div>
                                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                                    Appeler l'agent
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Formulaire */}
                        <Card className="border-slate-200 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
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
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label className="text-sm text-slate-500">
                                            Nom complet
                                        </Label>
                                        <Input
                                            placeholder="Votre nom"
                                            className="bg-white dark:bg-slate-800"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm text-slate-500">
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            placeholder="votre@email.com"
                                            className="bg-white dark:bg-slate-800"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm text-slate-500">
                                            Message
                                        </Label>
                                        <Textarea
                                            placeholder="Votre message..."
                                            className="min-h-25 bg-white dark:bg-slate-800"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <Button
                                        className="w-full bg-teal-600 hover:bg-teal-700"
                                        disabled={processing}
                                    >
                                        Envoyer
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

                {/* Lightbox */}
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
