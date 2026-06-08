import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Search,
    Home,
    Key,
    Calculator,
    ShieldCheck,
    MapPin,
    Clock,
    Heart,
    Star,
    Sparkles,
    Zap,
    Briefcase,
    Building2,
    Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
    {
        icon: Search,
        title: 'Recherche Sur-Mesure',
        desc: 'Filtres avancés par quartier, budget, surface et équipements.',
    },
    {
        icon: Calculator,
        title: 'Simulateur de Crédit',
        desc: 'Estimez vos mensualités et votre capacité d’emprunt.',
    },
    {
        icon: MapPin,
        title: 'Alertes Quartier',
        desc: 'Soyez informé dès qu’un bien est disponible dans vos zones favorites.',
    },
    {
        icon: Clock,
        title: 'Visites Privées',
        desc: 'Réservez un créneau de visite en ligne en quelques secondes.',
    },
    {
        icon: ShieldCheck,
        title: 'Dossier Sécurisé',
        desc: 'Déposez vos documents de location de manière 100% sécurisée.',
    },
    {
        icon: Heart,
        title: 'Favoris & Comparatif',
        desc: 'Enregistrez vos coups de cœur et comparez les prestations.',
    },
];

const profiles = [
    {
        icon: Users,
        label: 'Primo-accédants',
        description: 'Conseils pour votre premier achat immobilier.',
        href: "#",
    },
    {
        icon: Building2,
        label: 'Investisseurs',
        description: 'Optimisez votre rentabilité locative.',
        href: "#",
    },
    {
        icon: Briefcase,
        label: 'Professionnels',
        description: 'Bureaux et locaux commerciaux adaptés.',
        href: "#",
    },
];

const highlights = [
    { icon: Star, label: 'Biens vérifiés' },
    { icon: ShieldCheck, label: 'Garantie immo' },
    { icon: Zap, label: 'Réponse 24h' },
];

export function CentreAcheteurs() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
        >
            {/* Background Decor */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/40 to-transparent" />
                <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/8 blur-3xl dark:bg-teal-400/10" />
            </div>

            {/* Header */}
            <div className="relative border-b border-slate-200/70 bg-linear-to-r from-teal-50/90 via-white to-slate-50/90 px-6 py-4 dark:border-slate-800/70 dark:from-teal-950/20 dark:via-slate-950 dark:to-slate-900">
                <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-widest text-teal-700 uppercase shadow-sm dark:border-teal-800/50 dark:bg-teal-500/10 dark:text-teal-300">
                            <Sparkles className="h-3.5 w-3.5" />
                            Espace Porteur de Projet
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Trouvez le bien de vos rêves en toute simplicité
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            Tous les outils pour réussir votre achat ou votre location immobilière.
                        </p>
                    </div>
                    <div className="hidden items-center gap-2 lg:flex">
                        {highlights.map((item) => (
                            <div
                                key={item.label}
                                className="group flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/90 px-3 py-2 shadow-sm transition-all hover:border-teal-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10">
                                    <item.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                </div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative grid grid-cols-12">
                <section className="col-span-12 p-4 xl:col-span-8 xl:p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 ring-1 ring-teal-500/15">
                                <Key className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            </div>
                            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                Outils Acheteurs & Locataires
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                        {tools.map((tool, index) => (
                            <Link
                                key={tool.title}
                                href={'#'}
                                className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/90 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-teal-800/60"
                            >
                                <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-teal-500 via-teal-400 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="flex items-start gap-2">
                                    <div
                                        className={cn(
                                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all',
                                            index % 2 === 0
                                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
                                        )}
                                    >
                                        <tool.icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-1">
                                            <h4 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                                                {tool.title}
                                            </h4>
                                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 translate-x-1 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-teal-500 group-hover:opacity-100" />
                                        </div>
                                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                            {tool.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <aside className="col-span-12 border-t border-slate-200/70 bg-slate-50/70 p-4 xl:col-span-4 xl:border-t-0 xl:border-l dark:border-slate-800/70 dark:bg-slate-900/40">
                    <div className="mb-3">
                        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                            Accompagnement
                        </p>
                        <h4 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                            Guides Pratiques
                        </h4>
                    </div>
                    <div className="space-y-2">
                        {profiles.map((solution) => (
                            <Link
                                key={solution.label}
                                href={solution.href}
                                className="group flex items-start gap-2 rounded-xl border border-transparent p-2.5 transition-all hover:border-teal-200 hover:bg-white hover:shadow-sm dark:hover:border-teal-800/50 dark:hover:bg-slate-800/70"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                    <solution.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                                        {solution.label}
                                    </p>
                                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                                        {solution.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>
            </div>
        </motion.div>
    );
}
