import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    HelpCircle,
    ImageOff,
    Mail,
    Sparkles,
    Building2,
    Home,
    Key,
    Warehouse,
    Store,
    LayoutGrid,
} from 'lucide-react';

interface Category {
    id: number;
    nom: string;
    slug: string;
    url: string;
    image?: string | null;
}

interface HeaderData {
    categories: Category[];
}

const resources = [
    {
        icon: BookOpen,
        label: 'Actualités Immo',
        description: 'Conseils, tendances et guides du marché',
        href: route('blog.index'),
    },
    {
        icon: HelpCircle,
        label: "Centre d'aide",
        description: 'Réponses à vos questions juridiques',
        href: route('page.help'),
    },
    {
        icon: Home,
        label: 'À propos',
        description: 'Votre partenaire de confiance',
        href: route('page.about'),
    },
    {
        icon: Mail,
        label: 'Contact',
        description: 'Prenez rendez-vous avec un expert',
        href: route('page.contact'),
    },
];

const propertyTypes = [
    { icon: Building2, label: 'Appartements', href: '#' },
    { icon: Home, label: 'Villas & Maisons', href: '#' },
    { icon: Warehouse, label: 'Terrains', href: '#' },
    { icon: Store, label: 'Locaux Commerciaux', href: '#' },
    { icon: Key, label: 'Locations Vacances', href: '#' },
    { icon: LayoutGrid, label: 'Bureaux', href: '#' },
];

export function ChooseYetuContent() {
    const { headerData } = usePage().props as { headerData?: HeaderData };
    const categories = headerData?.categories ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scaleY: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="w-full"
        >
            <div className="relative overflow-hidden">
                {/* Fond décoratif */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-slate-50/40 to-teal-50/30 dark:from-slate-950/60 dark:via-slate-900/40 dark:to-teal-950/20" />
                <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-600/10" />

                <div className="relative grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[2fr_340px]">
                    {/* Colonne principale : Catégories */}
                    <div className="space-y-6">
                        {/* Entête */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-teal-50/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-teal-700 uppercase backdrop-blur-sm dark:border-teal-800/60 dark:bg-teal-950/30 dark:text-teal-300">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Explorez le Marché
                                </div>
                                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                                    Types de Biens Immobiliers
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Trouvez le type de propriété qui correspond à vos besoins.
                                </p>
                            </div>

                            <Link
                                href={route('properties.index')}
                                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-teal-800 dark:hover:bg-teal-950/30 dark:hover:text-teal-300"
                            >
                                Voir tout le catalogue
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Grille de types de biens */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {propertyTypes.map((type, index) => (
                                <motion.div
                                    key={type.label}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="group"
                                >
                                    <Link
                                        href={type.href}
                                        className="relative isolate block overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 p-4 shadow-sm ring-1 ring-slate-100/60 backdrop-blur-xl transition-all duration-500 hover:border-teal-300/70 hover:shadow-xl hover:shadow-teal-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:ring-slate-800/60 dark:hover:border-teal-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100 dark:bg-teal-950/30 dark:text-teal-400 dark:group-hover:bg-teal-900/40">
                                                <type.icon className="h-5 w-5" />
                                            </div>
                                            <h4 className="text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-teal-600 dark:text-slate-100 dark:group-hover:text-teal-400">
                                                {type.label}
                                            </h4>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Colonne secondaire : Ressources & CTA */}
                    <div className="space-y-6">
                        {/* Ressources */}
                        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm ring-1 ring-slate-100/60 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:ring-slate-800/60">
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                    Informations Utiles
                                </h4>
                            </div>

                            <div className="space-y-1">
                                {resources.map((resource) => (
                                    <Link
                                        key={resource.label}
                                        href={resource.href}
                                        className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 dark:bg-teal-950/30 dark:text-teal-400 dark:ring-teal-900/40">
                                            <resource.icon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-slate-800 transition-colors group-hover:text-teal-600 dark:text-slate-200 dark:group-hover:text-teal-400">
                                                {resource.label}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {resource.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="mt-1 h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal-500 dark:text-slate-500" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                            className="relative overflow-hidden rounded-2xl border border-teal-200/70 bg-linear-to-br from-teal-50 via-white to-slate-50 p-6 shadow-lg shadow-teal-500/5 dark:border-teal-900/50 dark:from-teal-950/30 dark:via-slate-900 dark:to-slate-900"
                        >
                            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl" />

                            <div className="relative">
                                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 shadow-sm dark:bg-teal-900/30 dark:text-teal-400">
                                    <Sparkles className="h-5 w-5" />
                                </div>

                                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                                    Rejoignez notre Réseau
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Propriétaires ou agences, boostez la visibilité de vos biens dès aujourd'hui.
                                </p>

                                <Link
                                    href={'#'}
                                    className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30 dark:bg-teal-500 dark:hover:bg-teal-400"
                                >
                                    Publier une annonce
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
