/* eslint-disable @typescript-eslint/no-unused-vars */
// resources/js/Pages/immo/pages/home/Home.tsx
import { Head, Link } from '@inertiajs/react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Search,
    Handshake,
    Shield,
    CheckCircle,
    Sparkles,
    MapPin,
    Star,
    Users,
    TrendingUp,
    Building,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import AppPublicLayout from '@/layouts/app-public-layout';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// Images d’exemple pour la grille (remplacées par des photos immobilières)
// ----------------------------------------------------------------------
const images = [
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', alt: 'Maison moderne' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', alt: 'Villa luxe' },
    { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400', alt: 'Appartement vue mer' },
    { src: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400', alt: 'Maison familiale' },
    { src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400', alt: 'Intérieur design' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', alt: 'Cuisine moderne' },
];

// ----------------------------------------------------------------------
// Grille d’images premium (version immobilière)
// ----------------------------------------------------------------------
function HeroImageGrid() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    return (
        <div className="relative">
             <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative overflow-hidden p-4 "
            >
                {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/40 to-transparent dark:from-white/5" /> */}

                <div className="grid grid-cols-3 gap-3">
                    {images.slice(0, 6).map((img, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.3 } }}
                            className={`group relative overflow-hidden rounded ${
                                index === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Section « Nos services » (adaptée de « Pour tous »)
// ----------------------------------------------------------------------
const servicesCards = [
    {
        title: 'Acheteurs',
        desc: 'Trouvez la maison de vos rêves grâce à notre large sélection de biens vérifiés.',
        icon: Search,
    },
    {
        title: 'Vendeurs / Propriétaires',
        desc: 'Bénéficiez d’une estimation gratuite et d’une mise en avant professionnelle.',
        icon: TrendingUp,
    },
    {
        title: 'Agents partenaires',
        desc: 'Rejoignez notre réseau et développez votre activité avec des outils modernes.',
        icon: Users,
    },
];

function ServicesSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white via-teal-50/40 to-slate-50 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/5" />
                <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-600/5" />
            </div>

            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
                >
                    Des services pour
                    <br />
                    <span className="bg-linear-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                        tous vos projets immobiliers
                    </span>
                </motion.h2>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesCards.map((card, idx) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                                className="group relative cursor-default rounded-3xl border border-white/50 bg-white/50 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/5 dark:border-slate-700/40 dark:bg-slate-800/40 dark:shadow-slate-900/30"
                            >
                                <div className="mb-5 inline-flex rounded-2xl bg-teal-100/80 p-3 text-teal-700 shadow-inner dark:bg-teal-900/50 dark:text-teal-300">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{card.title}</h3>
                                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{card.desc}</p>
                                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-teal-500/0 to-slate-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5 dark:group-hover:opacity-10" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// Section « Comment ça marche » (adaptée de « Créez rapidement »)
// ----------------------------------------------------------------------
const steps = [
    { step: '01', title: 'Recherchez votre bien', desc: 'Utilisez nos filtres avancés et notre carte interactive.' },
    { step: '02', title: 'Visitez en personne', desc: 'Prenez rendez‑vous avec un agent dédié.' },
    { step: '03', title: 'Finalisez l’achat ou la location', desc: 'Signature électronique et accompagnement juridique.' },
];

function CommentCaMarcheSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-24 dark:from-slate-900 dark:to-slate-950">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                >
                    Comment ça marche ?
                </motion.h2>

                <div className="mt-14 grid gap-6 sm:grid-cols-3">
                    {steps.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                            className="group relative rounded-3xl border border-white/40 bg-white/50 p-8 backdrop-blur-lg transition-all hover:shadow-xl hover:shadow-teal-500/5 dark:border-slate-700/30 dark:bg-slate-800/30"
                        >
                            <span className="text-6xl font-black text-teal-600/20 dark:text-teal-400/20">{item.step}</span>
                            <h3 className="mt-2 text-xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12"
                >
                    <Button
                        size="lg"
                        asChild
                        className="rounded-full bg-teal-600 px-10 py-6 text-lg font-semibold text-white shadow-lg shadow-teal-500/20 hover:bg-teal-700"
                    >
                        <Link href={route('properties.index')}>
                            Voir les propriétés
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// Section CTA Finale (adaptée)
// ----------------------------------------------------------------------
function CtaFinalSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            });
            tl.from(cardRef.current, {
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.6,
                ease: 'power3.out',
            })
                .from(textRef.current, { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
                .from(buttonRef.current, { y: 20, opacity: 0, scale: 0.9, duration: 0.4, ease: 'back.out(1.4)' }, '-=0.1');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-linear-to-b from-teal-50/70 via-white to-slate-50/70 py-24 dark:from-slate-950 dark:via-teal-950/10 dark:to-slate-950"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent" />
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <div
                    ref={cardRef}
                    className="rounded-3xl border border-white/40 bg-white/50 p-10 shadow-2xl shadow-teal-500/5 backdrop-blur-2xl sm:p-14 dark:border-slate-700/30 dark:bg-slate-800/30 dark:shadow-teal-500/5"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Prêt à concrétiser votre projet ?
                    </h2>
                    <p ref={textRef} className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                        Contactez‑nous dès aujourd’hui pour une estimation gratuite ou une visite personnalisée.
                    </p>
                    <div ref={buttonRef} className="mt-10">
                        <Button
                            size="lg"
                            asChild
                            className="rounded-full bg-teal-600 px-10 py-6 text-lg font-semibold text-white shadow-xl shadow-teal-500/20 hover:bg-teal-700"
                        >
                            <Link href={route('page.contact')}>
                                Nous contacter
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// Page principale
// ----------------------------------------------------------------------
function Home() {
    return (
        <>
            <Head title="Agence Immobilière - Accueil" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-teal-50 via-white to-slate-50 py-12 lg:py-20 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-400/5" />
                    <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-500/5" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.8 }}
                                className="mt-8 text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-6xl dark:text-white"
                            >
                                Trouvez la maison
                                <span className="block bg-linear-to-r from-teal-500 via-teal-600 to-teal-700 bg-clip-text text-transparent">
                                    de vos rêves
                                </span>
                                en quelques clics.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300"
                            >
                                Découvrez des centaines de biens vérifiés à Kinshasa et dans toute la RDC. Achat, location, estimation : tout est possible.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mt-10 flex flex-col gap-4 sm:flex-row"
                            >
                                <Button
                                    size="lg"
                                    className="rounded-full bg-teal-600 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-teal-500/20 hover:bg-teal-700"
                                    asChild
                                >
                                    <Link href={route('properties.index')}>
                                        Explorer les propriétés
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    className="rounded-full border-slate-300 bg-white/80 px-8 py-6 text-lg font-semibold text-slate-700 backdrop-blur hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
                                >
                                    <Link href={route('page.contact')}>
                                        Nous contacter
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
                            >
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-teal-500" /> Annonces vérifiées
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-teal-500" /> Accompagnement personnalisé
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-teal-500" /> Kinshasa & RDC
                                </div>
                            </motion.div>
                        </div>

                        <HeroImageGrid />
                    </div>
                </div>
            </section>

            {/* Section « Trouvez votre bien idéal » */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                Trouvez votre bien idéal
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Utilisez notre moteur de recherche intelligent pour filtrer par type, prix, localisation et bien plus.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    'Maisons, appartements, terrains',
                                    'Filtres avancés et carte interactive',
                                    'Visites virtuelles et photos HD',
                                    'Alertes personnalisées',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                                        <CheckCircle className="h-5 w-5 text-teal-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                                alt="Recherche immobilière"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <ServicesSection />

            {/* Comment ça marche */}
            <CommentCaMarcheSection />

            {/* Sécurité et confiance */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                Sécurité et confiance
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Toutes nos annonces sont vérifiées. Bénéficiez d’un accompagnement juridique et d’une transaction sécurisée.
                            </p>
                            <div className="mt-10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="mt-1 h-6 w-6 text-teal-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">+500</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Biens disponibles</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Star className="mt-1 h-6 w-6 text-teal-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Clients satisfaits</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-white/40 bg-white/50 p-8 shadow-2xl shadow-teal-500/5 backdrop-blur-xl dark:border-slate-700/30 dark:bg-slate-800/30 dark:shadow-teal-500/5">
                            <p className="text-sm font-semibold text-slate-500">Simulation de prise de contact</p>
                            <div className="mt-4 space-y-3">
                                <input
                                    disabled
                                    value="jean@exemple.com"
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        disabled
                                        value="+243 123 456 789"
                                        className="rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    />
                                    <input
                                        disabled
                                        value="Achat"
                                        className="rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    />
                                </div>
                                <input
                                    disabled
                                    value="Message envoyé avec succès"
                                    className="rounded-xl border-slate-200 bg-teal-50 px-4 py-3 text-sm text-teal-700 dark:border-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chiffres clés */}
            <section className="bg-linear-to-b from-white to-slate-50 py-20 lg:py-28 dark:from-slate-950 dark:to-slate-900">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Quelques chiffres
                    </h2>
                    <div className="mt-12 flex flex-wrap justify-center gap-8">
                        <div className="flex items-center gap-4">
                            <Building className="h-8 w-8 text-teal-500" />
                            <div className="text-left">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">500+</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Biens à vendre</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 text-teal-500" />
                            <div className="text-left">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">1 200+</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Clients satisfaits</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Handshake className="h-8 w-8 text-teal-500" />
                            <div className="text-left">
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">300+</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Transactions réalisées</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Finale */}
            <CtaFinalSection />
        </>
    );
}

Home.layout = (page: React.ReactNode) => <AppPublicLayout>{page}</AppPublicLayout>;
export default Home;
