import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Home,
    Search,
    ShieldCheck,
    Star,
    TrendingUp,
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage<{ name: string }>().props;

    return (
        <div className="relative grid min-h-dvh lg:max-w-none lg:grid-cols-2">
            {/* Colonne gauche – visuelle enrichie */}
            <div className="relative hidden h-full flex-col overflow-hidden bg-slate-900 p-10 text-white lg:flex">
                {/* Image de fond avec overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
                        alt="Agence immobilière"
                        className="h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/70 to-slate-900/40" />
                </div>

                {/* Logo + nom */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-3 text-lg font-semibold"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                        <AppLogoIcon className="h-6 w-6 text-white" />
                    </div>
                    <span>{name}</span>
                </Link>

                {/* Contenu central */}
                <div className="relative z-20 mt-auto pb-16">
                    {/* Statistiques / badges de confiance */}
                    <div className="mb-10 grid grid-cols-2 gap-4">
                        {[
                            {
                                icon: Home,
                                label: '500+',
                                desc: 'Biens disponibles',
                            },
                            {
                                icon: Star,
                                label: '98%',
                                desc: 'Clients satisfaits',
                            },
                            {
                                icon: ShieldCheck,
                                label: '100%',
                                desc: 'Annonces vérifiées',
                            },
                            {
                                icon: TrendingUp,
                                label: '300+',
                                desc: 'Transactions/mois',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.2 + i * 0.1,
                                    duration: 0.5,
                                }}
                                className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-500/30 text-teal-200">
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold leading-none">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-xs text-white/60">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Témoignage ou citation */}
                    <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="space-y-3 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur"
                    >
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">
                            &laquo; La plateforme la plus fiable pour trouver un
                            bien en RDC. J’ai trouvé ma maison en moins d’une
                            semaine ! &raquo;
                        </p>
                        <footer className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-teal-500/40" />
                            <div>
                                <p className="text-sm font-medium">
                                    Marie K.
                                </p>
                                <p className="text-xs text-white/50">
                                    Cliente vérifiée
                                </p>
                            </div>
                        </footer>
                    </motion.blockquote>

                    {/* Icônes de fonctionnalités */}
                    <div className="mt-10 flex items-center justify-center gap-6 text-xs text-white/50">
                        <div className="flex items-center gap-2">
                            <Search className="h-3.5 w-3.5" />
                            Recherche avancée
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Visites virtuelles
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Transaction sécurisée
                        </div>
                    </div>
                </div>
            </div>

            {/* Colonne droite – inchangée */}
            <div className="flex flex-col items-center justify-center bg-white px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
                <Link
                    href={home()}
                    className="mb-8 flex items-center justify-center lg:hidden"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 shadow-md dark:bg-teal-900/50">
                        <AppLogoIcon className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                    </div>
                </Link>

                <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {title}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
