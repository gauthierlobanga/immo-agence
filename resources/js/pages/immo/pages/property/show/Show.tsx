/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
    Camera,
    Sparkles,
    ArrowRight,
    Send,
    Loader2,
    BadgeDollarSign,
    LoaderIcon,
    Share2,
    Heart,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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

// ---- Lightbox ----
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-lg transition hover:bg-white/20"
            >
                <X className="h-6 w-6" />
            </button>
            <div className="absolute top-8 left-8 z-10 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-lg">
                {current + 1} / {images.length}
            </div>

            <div
                className="relative flex h-full w-full items-center justify-center p-4 md:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        src={images[current]?.url}
                        alt={images[current]?.alt}
                        className="max-h-full max-w-full rounded-3xl object-contain shadow-2xl shadow-black"
                    />
                </AnimatePresence>
            </div>

            <button
                onClick={(e) => {
 e.stopPropagation(); prev();
}}
                className="absolute top-1/2 left-8 z-10 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-lg transition hover:bg-white/20 disabled:opacity-30"
                disabled={current === 0}
            >
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button
                onClick={(e) => {
 e.stopPropagation(); next();
}}
                className="absolute top-1/2 right-8 z-10 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-lg transition hover:bg-white/20 disabled:opacity-30"
                disabled={current === images.length - 1}
            >
                <ChevronRightIcon className="h-8 w-8" />
            </button>

            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3 overflow-x-auto rounded-[2rem] bg-white/10 p-3 backdrop-blur-lg max-w-[90vw] no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
 e.stopPropagation(); goTo(idx);
}}
                        className={cn(
                            "h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300",
                            idx === current ? "border-teal-500 scale-110 opacity-100 shadow-lg shadow-teal-500/50" : "border-transparent opacity-40 hover:opacity-100"
                        )}
                    >
                        <img src={img.url} alt="" className="h-full w-full object-cover" />
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

    const visitForm = useForm({
        name: '',
        email: '',
        phone: '',
        message: `Je souhaiterais visiter ce bien : ${p.title}`,
    });

    const offerForm = useForm({
        amount: '',
        currency: p.currency || 'USD',
        type: 'purchase',
        message: '',
    });

    const reviewForm = useForm({ rating: 5, title: '', comment: '' });

    const submitContact = (e: React.SubmitEvent) => {
        e.preventDefault();
        visitForm.post(route('properties.contact', p.id), {
            preserveScroll: true,
            onSuccess: () => {
                visitForm.reset();
                toast.success('Demande envoyée !', { style: getToastStyle('success') });
            },
        });
    };

    const submitOffer = (e: React.SubmitEvent) => {
        e.preventDefault();
        offerForm.post(route('offers.store', p.id), {
            preserveScroll: true,
            onSuccess: () => {
                offerForm.reset();
                toast.success('Offre envoyée !', { style: getToastStyle('success') });
            },
        });
    };

    const formatPrice = (price: number, currency: string) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
        }).format(price);

    const featuresList: string[] = Array.isArray(p.features) ? p.features : [];

    const allImages: { url: string | undefined; alt: string }[] = [
        { url: p.main_image, alt: p.title },
        ...(p.images || []).map(img => ({ url: img.url, alt: img.alt || p.title }))
    ];

    const openLightbox = (index: number) => {
        setInitialImageIndex(index);
        setLightboxOpen(true);
    };

    const RichContentText = ({ content }: { content: string }) => {
        return (
            <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-emerald"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    };

    return (
        <>
            <Head title={`${p.title} - Immobilier de Prestige`} />

            {/* HERO DYNAMIQUE */}
            <section className="relative h-[50vh] w-full overflow-hidden lg:h-[65vh]">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={p.main_image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Badge className="rounded-full bg-teal-600 px-4 py-1.5 text-sm font-bold text-white shadow-xl shadow-teal-500/20">
                                        {p.status === 'available' ? 'Exclusivité' : p.status}
                                    </Badge>
                                    <Badge className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                                        {p.type}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                                    {p.title}
                                </h1>
                                <div className="flex items-center gap-2 text-xl text-slate-300">
                                    <MapPin className="h-6 w-6 text-teal-400" />
                                    <span>{p.address}, {p.city?.name}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-4 md:items-end">
                                <div className="text-5xl font-black text-white lg:text-7xl">
                                    {formatPrice(p.price, p.currency)}
                                </div>
                                <div className="flex gap-3">
                                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20">
                                        <Heart className="h-6 w-6" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20">
                                        <Share2 className="h-6 w-6" />
                                    </Button>
                                    <Button size="lg" className="h-14 rounded-2xl bg-teal-600 px-8 text-lg font-bold text-white shadow-2xl shadow-teal-500/20 hover:bg-teal-500" asChild>
                                        <a href="#contact">Contactez l'expert</a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                {/* GRID PRINCIPALE */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* COLONNE GAUCHE - CONTENU */}
                    <div className="space-y-16 lg:col-span-8">

                        {/* GALLERY BENTO */}
                        <div className="grid grid-cols-12 grid-rows-2 gap-4 h-150">
                            <motion.div
                                whileHover={{ scale: 0.99 }}
                                className="col-span-8 row-span-2 relative overflow-hidden rounded-[2.5rem] cursor-pointer group"
                                onClick={() => openLightbox(0)}
                            >
                                <img src={allImages[0]?.url} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                className="col-span-4 row-span-1 relative overflow-hidden rounded-[2.5rem] cursor-pointer group"
                                onClick={() => openLightbox(1)}
                            >
                                <img src={allImages[1]?.url} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                className="col-span-4 row-span-1 relative overflow-hidden rounded-[2.5rem] cursor-pointer group"
                                onClick={() => openLightbox(2)}
                            >
                                <img src={allImages[2]?.url} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                {allImages.length > 3 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                                        <span className="text-4xl font-black text-white">+{allImages.length - 3}</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* DESCRIPTION SECTION */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-1 w-12 bg-teal-500" />
                                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Présentation du bien</h2>
                            </div>
                            <RichContentText content={p.description} />
                        </section>

                        {/* CARACTÉRISTIQUES */}
                        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {[
                                { label: 'Chambres', value: p.bedrooms, icon: Bed },
                                { label: 'Salles de bain', value: p.bathrooms, icon: Bath },
                                { label: 'Surface', value: `${p.area} m²`, icon: Maximize },
                                { label: 'Type', value: p.type, icon: Home }
                            ].map((item, idx) => (
                                <Card key={idx} className="rounded-[2rem] border-slate-100 bg-slate-50/50 p-6 text-center transition-all hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50">
                                    <item.icon className="mx-auto h-8 w-8 text-teal-600" />
                                    <p className="mt-4 text-sm font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{item.value || 'N/A'}</p>
                                </Card>
                            ))}
                        </section>

                        {/* AMENITIES */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Équipements inclus</h3>
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                {featuresList.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white dark:bg-teal-900/20">
                                            <CheckCircle className="h-6 w-6" />
                                        </div>
                                        <span className="text-lg font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SIMILAR PROPERTIES CAROUSEL */}
                        {similarProperties.data.length > 0 && (
                            <section className="space-y-8">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Biens similaires</h3>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={24}
                                    slidesPerView={1}
                                    breakpoints={{ 640: { slidesPerView: 2 } }}
                                    className="w-full pb-12"
                                >
                                    {similarProperties.data.map((sim) => (
                                        <SwiperSlide key={sim.id}>
                                            <Link href={route('properties.show', sim.slug)} className="group block">
                                                <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-xl">
                                                    <img src={sim.main_image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <Badge className="mb-2 bg-teal-600 text-white">{sim.type}</Badge>
                                                        <h4 className="text-xl font-black text-white truncate">{sim.title}</h4>
                                                        <p className="mt-1 text-2xl font-bold text-teal-400">{formatPrice(sim.price, sim.currency)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </section>
                        )}
                    </div>

                    {/* COLONNE DROITE - SIDEBAR STICKY */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8" id="contact">

                            {/* AGENT CARD PREMIUN */}
                            <Card className="rounded-[3rem] border-none bg-slate-900 p-8 shadow-2xl shadow-slate-950 text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/20 blur-3xl rounded-full" />
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-20 w-20 rounded-[1.5rem] overflow-hidden border-2 border-teal-500/50 p-1">
                                            <img src={p.agent?.avatar_url || `https://ui-avatars.com/api/?name=${p.agent?.name}&background=0d9488&color=fff`} className="h-full w-full object-cover rounded-[1.2rem]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-teal-400 uppercase tracking-widest">Conseiller expert</p>
                                            <h3 className="text-2xl font-black">{p.agent?.name}</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <Button className="w-full h-14 rounded-2xl bg-teal-600 text-lg font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-500/20" asChild>
                                            <a href={`tel:${p.agent?.phone}`}><Phone className="mr-3 h-5 w-5" /> Contacter par téléphone</a>
                                        </Button>
                                        <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-lg font-bold hover:bg-white/10" asChild>
                                            <a href={`mailto:${p.agent?.email}`}><Mail className="mr-3 h-5 w-5" /> Envoyer un email</a>
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* VISIT FORM CARD */}
                            <Card className="rounded-[3rem] border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-xl">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Demande de visite</h3>
                                <form onSubmit={submitContact} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold ml-1">Nom complet</Label>
                                        <Input
                                            placeholder="Votre nom"
                                            value={visitForm.data.name}
                                            onChange={e => visitForm.setData('name', e.target.value)}
                                            className="h-14 rounded-2xl bg-slate-50 border-none dark:bg-slate-800 focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold ml-1">Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="votre@email.com"
                                            value={visitForm.data.email}
                                            onChange={e => visitForm.setData('email', e.target.value)}
                                            className="h-14 rounded-2xl bg-slate-50 border-none dark:bg-slate-800 focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold ml-1">Message</Label>
                                        <Textarea
                                            rows={4}
                                            value={visitForm.data.message}
                                            onChange={e => visitForm.setData('message', e.target.value)}
                                            className="rounded-2xl bg-slate-50 border-none dark:bg-slate-800 focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={visitForm.processing}
                                        className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                    >
                                        {visitForm.processing ? <Loader2 className="animate-spin h-6 w-6" /> : "Planifier maintenant"}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </aside>
                </div>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={allImages}
                        initialIndex={initialImageIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Composant Helper CheckCircle non importé
function CheckCircle({ className }: { className?: string }) {
    return <Sparkles className={className} />;
}

PropertyShow.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);
export default PropertyShow;
