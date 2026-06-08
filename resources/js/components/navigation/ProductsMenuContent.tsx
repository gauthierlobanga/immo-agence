import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Home,
    Key,
    ShieldCheck,
    FileText,
    Calculator,
    Users,
    ClipboardCheck,
    Briefcase,
    TrendingUp,
    ArrowRight,
    Building,
    UserCheck,
} from 'lucide-react';

const services = [
    { icon: Key, title: 'Gestion Locative', desc: 'Confiez-nous la gestion de vos biens en toute sérénité.' },
    { icon: ClipboardCheck, title: 'Expertise Immobilière', desc: 'Estimation précise de la valeur vénale de vos propriétés.' },
    { icon: FileText, title: 'Rédaction de Bail', desc: 'Sécurisez vos locations avec des contrats conformes.' },
    { icon: ShieldCheck, title: 'Assurance GLI', desc: 'Garantie Loyers Impayés pour protéger vos revenus.' },
    { icon: Users, title: 'Syndic de Copropriété', desc: 'Une gestion transparente et efficace de vos immeubles.' },
    { icon: Calculator, title: 'Simulateur de Rentabilité', desc: 'Calculez le rendement de vos investissements locatifs.' },
];

const solutions = [
    { icon: UserCheck, label: 'Pour les Propriétaires' },
    { icon: Building, label: 'Pour les Investisseurs' },
    { icon: Briefcase, label: 'Pour les Entreprises' },
];

export function ProductsMenuContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scaleY: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="w-full"
        >
            <div className="relative overflow-hidden p-4 lg:p-10">
                {/* Fond décoratif */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-slate-50/40 to-teal-50/30 dark:from-slate-950/60 dark:via-slate-900/40 dark:to-teal-950/20" />
                <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-slate-400/10 blur-3xl dark:bg-slate-600/10" />

                <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Colonne principale : Services */}
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-teal-50/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-teal-700 uppercase backdrop-blur-sm dark:border-teal-800/60 dark:bg-teal-950/30 dark:text-teal-300">
                            <Home className="h-3.5 w-3.5" />
                            Nos Services
                        </div>
                        <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                            Accompagnement Immobilier Complet
                        </h4>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Des solutions sur mesure pour chaque étape de votre projet.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {services.map((service) => (
                                <Link
                                    key={service.title}
                                    href={'#'}
                                    className="group flex gap-4 rounded-2xl border border-slate-200/70 bg-white/75 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:border-teal-200 hover:shadow-md hover:shadow-teal-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-teal-800"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 transition-colors group-hover:bg-teal-100 dark:bg-teal-950/30 dark:text-teal-400 dark:ring-teal-900/40 dark:group-hover:bg-teal-900/40">
                                        <service.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-slate-100 dark:group-hover:text-teal-400">
                                            {service.title}
                                        </h5>
                                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                            {service.desc}
                                        </p>
                                    </div>
                                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-teal-500 dark:text-slate-600 dark:group-hover:text-teal-400" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Colonne latérale : Solutions & CTA */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                Profils
                            </h4>
                            <ul className="space-y-1">
                                {solutions.map((sol) => (
                                    <li key={sol.label}>
                                        <Link
                                            href={'#'}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition-all hover:bg-slate-50 hover:text-teal-600 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-teal-400"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                <sol.icon className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{sol.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="relative overflow-hidden rounded-2xl border border-teal-200/70 bg-linear-to-br from-teal-50 via-white to-slate-50 p-5 shadow-md shadow-teal-500/5 dark:border-teal-900/50 dark:from-teal-950/30 dark:via-slate-900 dark:to-slate-900">
                            <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-teal-400/10 blur-2xl" />
                            <div className="relative">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    Estimez votre bien
                                </p>
                                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                    Obtenez une estimation gratuite en 2 minutes.
                                </p>
                                <Link
                                    href={'#'}
                                    className="group mt-3 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30 dark:bg-teal-500 dark:hover:bg-teal-400"
                                >
                                    Estimer maintenant
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
