// resources/js/layouts/AppHeader.tsx
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import AppearanceToogle from '@/components/appearance-toogle';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductsMenuContent } from '@/components/navigation/ProductsMenuContent';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { login } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';
import { MainNavigation } from './MainNavigation';
import { MobileNavigation } from './MobileNavigation';
import { UserNavigation } from './UserNavigation';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { auth } = usePage().props;

    const navItems: NavItem[] = [
        {
            title: 'Immobilier',
            content: <ProductsMenuContent />,
            href: '',
        },
        {
            title: 'Gestion locative',
            content: <ProductsMenuContent />,
            href: '',
        },

        {
            title: 'Services',
            href: '#',
        },
        {
            title: 'Support',
            content: <ProductsMenuContent />,
            href: '',
        },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80"
            >
                <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        {/* Menu mobile */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-600 dark:bg-slate-800/50 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                                        aria-label="Menu principal"
                                    >
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="flex w-80 flex-col border-r border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <SheetHeader className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                                        <div className="flex items-center justify-between">
                                            <SheetTitle className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-200 dark:bg-teal-500 dark:shadow-teal-900/40">
                                                    <AppLogoIcon className="h-6 w-6 fill-current" />
                                                </div>
                                                <div className="flex flex-col items-start leading-tight">
                                                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                                                        IMMO
                                                    </span>
                                                    <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
                                                        Agence Immobilière
                                                    </span>
                                                </div>
                                            </SheetTitle>
                                        </div>
                                    </SheetHeader>

                                    <div className="flex-1 overflow-y-auto px-2 py-4">
                                        <div className="space-y-1">
                                            <MobileNavigation items={navItems} />
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                                        {!auth.user ? (
                                            <div className="flex flex-col gap-3">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="w-full border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                                >
                                                    <Link href={login()}>
                                                        Se connecter
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                                >
                                                    <Link
                                                        href={route(
                                                            'properties.index',
                                                        )}
                                                    >
                                                        Voir les biens
                                                    </Link>
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                asChild
                                                className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                            >
                                                <Link href={route('dashboard')}>
                                                    Accéder au Dashboard
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Logo */}
                        <div className="flex shrink-0 items-center">
                            <Link
                                href={route('home')}
                                className="flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
                            >
                                <AppLogo className="h-8 w-auto" />
                            </Link>
                        </div>

                        {/* Navigation principale desktop */}
                        <div className="hidden h-full items-center border-l border-slate-200/60 pl-8 lg:flex dark:border-slate-700/50">
                            <MainNavigation items={navItems} />
                        </div>
                    </div>

                    {/* Actions à droite */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden sm:block">
                            <AppearanceToogle />
                        </div>

                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                    asChild
                                >
                                    <Link href={route('dashboard')}>
                                        <span className="relative z-10 flex items-center">
                                            Tableau de bord
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                                    </Link>
                                </Button>
                                <UserNavigation user={auth.user} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-sm font-medium text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
                                >
                                    <Link href={login()}>Se connecter</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                    asChild
                                >
                                    <Link href={route('properties.index')}>
                                        <span className="relative z-10 flex items-center">
                                            Voir les biens
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Breadcrumbs */}
            <AnimatePresence>
                {breadcrumbs.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-slate-200/60 dark:border-slate-700/50"
                    >
                        <div className="container mx-auto flex h-10 items-center px-4 sm:px-6 lg:px-8">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
