import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
            {/* Cercles décoratifs animés */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-teal-200/20 blur-[120px] dark:bg-teal-800/10" />
                <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-slate-300/20 blur-[120px] dark:bg-slate-700/10" />
            </div>

            {/* Conteneur principal */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                {/* Logo + lien accueil */}
                <div className="mb-8 text-center">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-3 text-sm font-medium text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-md shadow-slate-200/50 dark:bg-slate-800 dark:shadow-slate-900/50">
                            <AppLogoIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        Retour à l’accueil
                    </Link>
                </div>

                {/* Carte d’authentification */}
                <Card className="overflow-hidden border-0 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/80 dark:shadow-slate-950/50">
                    <CardHeader className="px-6 pt-8 pb-4 text-center sm:px-10">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className="px-6 pb-8 sm:px-10">
                        {children}
                    </CardContent>
                </Card>

                {/* Pied de page optionnel (liens utiles) */}
                <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
                    Propulsé par{' '}
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                        Immo RDC
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
