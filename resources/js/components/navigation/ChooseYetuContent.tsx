import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    HelpCircle,
    Mail,
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

const propertyTypes = [
    { icon: Building2, label: 'Appartements', href: '#', count: '124' },
    { icon: Home, label: 'Villas & Maisons', href: '#', count: '86' },
    { icon: Warehouse, label: 'Terrains', href: '#', count: '42' },
    { icon: Store, label: 'Locaux Commerciaux', href: '#', count: '15' },
    { icon: Key, label: 'Locations Vacances', href: '#', count: '31' },
    { icon: LayoutGrid, label: 'Bureaux', href: '#', count: '12' },
];

const quickLinks = [
    { icon: BookOpen, label: 'Blog & Actu', href: route('blog.index') },
    { icon: HelpCircle, label: 'FAQ', href: route('page.help') },
    { icon: Mail, label: 'Contact', href: route('page.contact') },
];

export function ChooseYetuContent() {
    const { headerData } = usePage().props as { headerData?: HeaderData };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-white dark:bg-slate-950"
        >
            <div className="mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
                    {/* Section Principale - Types de Biens */}
                    <div className="p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                    Catégories Immobilières
                                </h3>
                            </div>
                            <Link
                                href={route('properties.index')}
                                className="group flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                Voir tout le catalogue
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                            {propertyTypes.map((type) => (
                                <Link
                                    key={type.label}
                                    href={type.href}
                                    className="group relative flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-500/5 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-teal-900 dark:hover:bg-slate-900"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200/50 transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
                                        <type.icon className="h-6 w-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-slate-100 dark:group-hover:text-teal-400">
                                            {type.label}
                                        </h4>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
                                            {type.count} annonces
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Section Latérale - Liens Rapides & Ressources */}
                    <div className="border-l border-slate-100 bg-slate-50/30 p-8 dark:border-slate-800 dark:bg-slate-900/20">
                        <h3 className="mb-6 text-sm font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                            Ressources
                        </h3>
                        
                        <div className="space-y-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="group flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-white hover:shadow-md hover:shadow-slate-200/50 dark:hover:bg-slate-800 dark:hover:shadow-none"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 ring-1 ring-slate-200/50 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700 dark:group-hover:bg-teal-900/30 dark:group-hover:text-teal-400">
                                        <link.icon className="h-4.5 w-4.5" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-teal-700 dark:text-slate-300 dark:group-hover:text-teal-400">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Petite Bannière CTA compacte */}
                        <div className="mt-8 rounded-2xl bg-teal-600 p-5 text-white shadow-lg shadow-teal-600/20">
                            <h4 className="text-sm font-bold">Vendre votre bien ?</h4>
                            <p className="mt-1 text-xs text-teal-50/80">
                                Confiez-nous votre annonce pour une visibilité maximale.
                            </p>
                            <Link
                                href="#"
                                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-transform hover:translate-x-1"
                            >
                                Commencer ici
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
