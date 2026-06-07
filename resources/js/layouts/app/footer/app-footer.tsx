// resources/js/layouts/FooterSection.tsx
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import {
    ChevronRight,
    CreditCard,
    Globe,
    ArrowUpRight,
} from 'lucide-react';
import { useRef } from 'react';

import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa';
import AppLogo from '@/components/app-logo';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import properties from '@/routes/properties';
import page from '@/routes/page';
import blog from '@/routes/blog';

const socialLinks = [
    { name: 'Facebook', href: '#', icon: FaFacebook },
    { name: 'Instagram', href: '#', icon: FaInstagram },
    { name: 'X', href: '#', icon: FaTwitter },
    { name: 'LinkedIn', href: '#', icon: FaLinkedin },
    { name: 'YouTube', href: '#', icon: FaYoutube },
];


const footerSections = [
    {
        title: 'Agence',
        links: [
            { name: 'Propriétés', href: properties.index().url },

            {
                name: 'Nouveautés',
                href: '#',
                badge: 'New',
            },

        ],
    },
    {
        title: 'Entreprise',
        links: [
            { name: 'À propos', href:page.about().url },
            { name: 'Blog', href: blog.index().url },
        ],
    },
    {
        title: 'Support',
        links: [
            { name: 'Contact', href: page.contact().url },
            { name: 'FAQ', href: page.faq().url },
        ],
    },
    {
        title: 'Légal',
        links: [
            { name: 'Conditions', href: '#' },
            { name: 'Confidentialité', href: '#' },
            { name: 'Cookies', href: '#' },
            { name: 'Center Help', href: '#' },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function FooterSection() {
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const currentYear = new Date().getFullYear();

    return (
        <footer
            ref={ref}
            className="relative w-full overflow-hidden border-t border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950"
        >
            {/* Main Footer – pleine largeur, contenu centré */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
            >
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Brand */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4"
                    >
                        <Link
                            href={route('home')}
                            className="inline-flex items-center"
                        >
                            <AppLogo />
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Une plateforme e-commerce moderne conçue pour offrir
                            une expérience d’achat rapide, sécurisée et
                            élégante.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={cn(
                                        'flex h-10 w-10 items-center justify-center rounded-xl border',
                                        'border-slate-200/70 bg-white text-slate-500',
                                        'transition-all duration-300',
                                        'hover:border-emerald-200 hover:text-emerald-600',
                                        'dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400',
                                        'dark:hover:border-emerald-800 dark:hover:text-emerald-400',
                                    )}
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links */}
                    <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
                        {footerSections.map((section) => (
                            <motion.div
                                key={section.title}
                                variants={itemVariants}
                            >
                                <h3 className="mb-4 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="group inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                                            >
                                                <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                                <span className="relative">
                                                    {link.name}
                                                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                                                </span>

                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <Separator className="bg-slate-200/70 dark:bg-slate-800/70" />

            {/* Bottom Bar – pleine largeur */}
            <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between dark:text-slate-400">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center gap-2">
                            <Globe className="h-4 w-4 text-emerald-500" />{' '}
                            Français • CDF
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-emerald-500" />{' '}
                            Visa • Mastercard • PayPal
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span>
                            © {currentYear} {import.meta.env.VITE_APP_NAME}.
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span>Tous droits réservés.</span>
                    </div>
                    <Link
                        href="#top"
                        className="group inline-flex items-center gap-1 font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                    >
                        Retour en haut
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
