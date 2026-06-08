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
// Grille d’images premium (version immobilière éditoriale)
// ----------------------------------------------------------------------
function HeroImageGrid() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="relative lg:pl-10">
            {/* Éléments de design flottants */}
            <div className="absolute -top-10 -right-10 z-0 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 z-0 h-40 w-40 rounded-full bg-slate-400/10 blur-3xl" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 grid grid-cols-12 gap-4"
            >
                {/* Image principale */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-8 overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/40"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                        alt="Villa de luxe"
                        className="aspect-4/5 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </motion.div>

                {/* Images secondaires */}
                <div className="col-span-4 flex flex-col gap-4">
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/40"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687940-47a04b62d730?w=400"
                            alt="Intérieur moderne"
                            className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/40"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600566753086-00f18fb6f3ea?w=400"
                            alt="Cuisine design"
                            className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </motion.div>
                </div>

                {/* Badge flottant interactif */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute -right-6 bottom-12 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                        <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Note Moyenne</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">4.9/5 <span className="text-sm font-medium text-slate-500">(1.2k avis)</span></p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Section « Nos services » (Design Épuré)
// ----------------------------------------------------------------------
const servicesCards = [
    {
        title: 'Trouver un bien',
        desc: 'Parcourez une sélection rigoureuse d’appartements, villas et terrains vérifiés par nos experts.',
        icon: Search,
        color: 'teal',
    },
    {
        title: 'Estimer & Vendre',
        desc: 'Obtenez une valeur de marché précise et vendez votre propriété rapidement grâce à notre réseau.',
        icon: TrendingUp,
        color: 'slate',
    },
    {
        title: 'Gestion Locative',
        desc: 'Libérez-vous des contraintes administratives et sécurisez vos revenus locatifs mensuels.',
        icon: Shield,
        color: 'teal',
    },
];

function ServicesSection() {
    return (
        <section className="relative overflow-hidden bg-white py-32 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-sm font-bold text-teal-700 dark:border-teal-900/30 dark:bg-teal-900/20 dark:text-teal-400"
                    >
                        <Sparkles className="h-4 w-4" />
                        Expertise Immobilière
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white"
                    >
                        Un accompagnement sur-mesure pour <span className="text-teal-600">chaque étape</span>
                    </motion.h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {servicesCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-10 transition-all duration-500 hover:border-teal-200 hover:bg-white hover:shadow-2xl hover:shadow-teal-500/10 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-teal-900/50 dark:hover:bg-slate-900"
                            >
                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-sm ring-1 ring-slate-200/50 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600 dark:bg-slate-800 dark:ring-slate-700">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                                <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">{card.desc}</p>
                                <Link
                                    href="#"
                                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-teal-600 transition-all group-hover:gap-3 dark:text-teal-400"
                                >
                                    En savoir plus
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// Section « Comment ça marche » (Moderne & Visuelle)
// ----------------------------------------------------------------------
const steps = [
    { 
        step: '01', 
        title: 'Exploration', 
        desc: 'Utilisez nos outils de recherche intelligents pour cibler précisément vos besoins parmi des centaines d’annonces.',
        icon: Search 
    },
    { 
        step: '02', 
        title: 'Expertise', 
        desc: 'Bénéficiez des conseils de nos agents locaux pour valider la conformité juridique et technique du bien.',
        icon: UserCheck 
    },
    { 
        step: '03', 
        title: 'Finalisation', 
        desc: 'Nous vous accompagnons jusqu’à la signature finale pour une transaction en toute sécurité.',
        icon: Shield 
    },
];

function CommentCaMarcheSection() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-32 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                            Une méthode <br />
                            <span className="text-teal-600">claire & efficace</span>
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                            Nous avons simplifié chaque étape du processus immobilier pour vous offrir une expérience fluide et sans stress.
                        </p>
                        <div className="mt-10 flex justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-slate-900 px-8 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                asChild
                            >
                                <Link href={route('properties.index')}>
                                    Commencer l'aventure
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl space-y-6">
                        {steps.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative flex items-center gap-6 rounded-3xl border border-slate-200/50 bg-white p-6 transition-all hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/5 dark:border-slate-800 dark:bg-slate-950"
                            >
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-2xl font-black text-slate-300 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600 dark:bg-slate-900 dark:text-slate-700 dark:group-hover:bg-teal-900/30">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
            <Head title="Agence Immobilière de Luxe - Accueil" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-24 lg:pb-40 dark:bg-slate-950">
                {/* Éléments d'arrière-plan sophistiqués */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[120px] dark:bg-teal-400/10" />
                    <div className="absolute -bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-slate-200/50 blur-[120px] dark:bg-slate-800/20" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 pr-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 dark:border-slate-900">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="h-full w-full rounded-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                    +5,000 clients satisfaits en RDC
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-7xl lg:text-7xl dark:text-white"
                            >
                                L'immobilier <br />
                                <span className="relative inline-block text-teal-600">
                                    réinventé
                                    <svg className="absolute -bottom-2 left-0 h-3 w-full text-teal-200 dark:text-teal-900/50" viewBox="0 0 338 12" fill="none" preserveAspectRatio="none">
                                        <path d="M1 10.5C64.6667 4.16667 192.8 -6.39999 337 10.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                </span>
                                pour vous.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="mt-8 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl dark:text-slate-400"
                            >
                                Découvrez une expérience immobilière fluide, sécurisée et transparente. Trouvez votre prochain chez-vous parmi nos biens exclusifs.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mt-12 flex flex-col gap-4 sm:flex-row"
                            >
                                <Button
                                    size="lg"
                                    className="h-16 rounded-2xl bg-teal-600 px-10 text-lg font-bold text-white shadow-2xl shadow-teal-500/20 transition-all hover:bg-teal-700 hover:scale-[1.02] active:scale-95 dark:bg-teal-500 dark:hover:bg-teal-600"
                                    asChild
                                >
                                    <Link href={route('properties.index')}>
                                        Explorer les offres
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 rounded-2xl border-slate-200 bg-white px-10 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                                    asChild
                                >
                                    <Link href={route('page.contact')}>
                                        Nous contacter
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-16 flex flex-wrap items-center gap-8 text-sm font-bold text-slate-400 dark:text-slate-600"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-teal-500" /> Annonces Vérifiées
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-teal-500" /> Support 24/7
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-teal-500" /> Paiement Sécurisé
                                </div>
                            </motion.div>
                        </div>

                        <HeroImageGrid />
                    </div>
                </div>
            </section>

            {/* Section Recherche Intelligence (Design Épuré) */}
            <section className="bg-slate-50 py-32 dark:bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-20 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square overflow-hidden rounded-[3rem] border border-white shadow-2xl dark:border-slate-800"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000"
                                alt="Propriété d'exception"
                                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                                <p className="text-lg font-bold text-white">"La plateforme la plus intuitive pour trouver son futur chez-soi."</p>
                                <p className="mt-2 text-sm text-white/80">— Marc L., Client satisfait</p>
                            </div>
                        </motion.div>
                        
                        <div>
                            <div className="mb-6 h-1 w-12 bg-teal-600" />
                            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                                Une recherche <br />
                                <span className="text-teal-600">intelligente & visuelle</span>
                            </h2>
                            <p className="mt-8 text-xl leading-relaxed text-slate-500 dark:text-slate-400">
                                Fini les recherches fastidieuses. Nous avons conçu une interface qui met l'image et l'information essentielle au cœur de votre expérience.
                            </p>
                            
                            <div className="mt-12 space-y-6">
                                {[
                                    { t: 'Filtres de précision', d: 'Ciblez par quartier, budget et équipements spécifiques.' },
                                    { t: 'Visites haute définition', d: 'Découvrez chaque recoin grâce à nos photos et vidéos HD.' },
                                    { t: 'Alertes en temps réel', d: 'Soyez le premier informé des nouveaux biens sur le marché.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{item.t}</h4>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <ServicesSection />

            {/* Comment ça marche */}
            <CommentCaMarcheSection />

            {/* Section Chiffres (Design Premium) */}
            <section className="bg-slate-900 py-32 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-20 grid gap-12 text-center md:grid-cols-3">
                        <div>
                            <p className="text-6xl font-black text-teal-500">500+</p>
                            <p className="mt-4 text-lg font-bold text-slate-400 uppercase tracking-widest">Biens Exclusifs</p>
                        </div>
                        <div>
                            <p className="text-6xl font-black text-teal-500">98%</p>
                            <p className="mt-4 text-lg font-bold text-slate-400 uppercase tracking-widest">Taux de Satisfaction</p>
                        </div>
                        <div>
                            <p className="text-6xl font-black text-teal-500">24h</p>
                            <p className="mt-4 text-lg font-bold text-slate-400 uppercase tracking-widest">Délai de Réponse</p>
                        </div>
                    </div>
                    
                    <div className="rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
                        <h3 className="text-3xl font-black">Pourquoi nous faire confiance ?</h3>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
                            Nous sommes bien plus qu'une simple agence. Nous sommes vos partenaires pour construire votre avenir en RDC. Sécurité juridique, expertise locale et support sans faille.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Finale */}
            <CtaFinalSection />
        </>
    );
}

            {/* CTA Finale */}
            <CtaFinalSection />
        </>
    );
}

Home.layout = (page: React.ReactNode) => <AppPublicLayout>{page}</AppPublicLayout>;
export default Home;
