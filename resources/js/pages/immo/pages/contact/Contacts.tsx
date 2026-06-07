// resources/js/Pages/immo/pages/contact/Contact.tsx
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    CheckCircle2Icon,
    Clock3Icon,
    HeadphonesIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareTextIcon,
    PhoneIcon,
    ShieldCheckIcon,
    SparklesIcon,
    Send,
    Globe,
    Users,
    Zap,
    UserIcon,
    LoaderIcon,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppPublicLayout from '@/layouts/app-public-layout';
import getToastStyle from '@/lib/toast-style';
import { cn } from '@/lib/utils';

type Props = {
    categories: Record<string, string>;
    contactMeta?: {
        appName?: string;
        email?: string;
        phone?: string | null;
        address?: string;
        responseTime?: string;
        availability?: string;
        supportHours?: string;
        location?: string;
    };
};

type FormData = {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    categorie: string;
    sujet: string;
    message: string;
};

const categoryDetails: Record<
    string,
    {
        description: string;
        accent: string;
        icon: React.ComponentType<{ className?: string }>;
    }
> = {
    general: {
        description: 'Pour une question générale ou un premier contact.',
        accent: 'from-teal-500/10 to-teal-600/5',
        icon: Globe,
    },
    commercial: {
        description:
            'Demandez un devis, une présentation ou un accompagnement business.',
        accent: 'from-teal-600/10 to-teal-700/5',
        icon: Zap,
    },
    technique: {
        description: 'Signalez un besoin technique ou une intégration.',
        accent: 'from-teal-500/10 to-teal-500/5',
        icon: ShieldCheckIcon,
    },
    support: {
        description: 'Obtenez de l’aide sur un service en cours.',
        accent: 'from-teal-400/10 to-teal-500/5',
        icon: HeadphonesIcon,
    },
    reclamation: {
        description:
            'Partagez une insatisfaction pour un traitement prioritaire.',
        accent: 'from-teal-600/10 to-teal-700/5',
        icon: MessageSquareTextIcon,
    },
};

 function Contact({ categories, contactMeta = {} }: Props) {
    const { name: appName } = usePage<{ name: string }>().props;

    const meta = {
        appName: contactMeta?.appName ?? appName ?? 'Immo RDC',
        email: contactMeta?.email ?? 'contact@immo.test',
        phone: contactMeta?.phone ?? null,
        address: contactMeta?.address ?? 'Kinshasa – RDC',
        responseTime: contactMeta?.responseTime ?? '< 24h ouvrables',
        availability:
            contactMeta?.availability ?? 'Du lundi au samedi, 8h - 18h',
        supportHours: contactMeta?.supportHours ?? 'Support technique 7j/7',
        location: contactMeta?.location ?? 'Kinshasa – RDC',
    };

    const defaultCategory = Object.keys(categories)[0] ?? 'general';

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm<FormData>({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        categorie: defaultCategory,
        sujet: '',
        message: '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(route('page.contact.store'), {
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                reset();
                toast.success('Votre message a été envoyé avec succès.', {
                    style: getToastStyle('success'),
                });
            },
            onError: () => {
                toast.error('Veuillez corriger les erreurs du formulaire.', {
                    style: getToastStyle('error'),
                });
            },
        });
    }

    const SelectedCategoryIcon = categoryDetails[data.categorie]?.icon || Globe;

    return (
        <>
            <Head title={`Contactez ${meta.appName}`} />

            {/* HERO SECTION – fond dégradé teal/slate */}
            <section className="relative overflow-hidden bg-linear-to-b from-teal-50 via-white to-slate-50 px-4 py-20 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-teal-200/20 blur-[120px] dark:bg-teal-800/10" />
                    <div className="absolute -right-40 -bottom-40 h-125 w-125 rounded-full bg-slate-300/20 blur-[120px] dark:bg-slate-700/10" />
                </div>

                <div className="mx-auto max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5"
                    >
                        <Badge className="gap-1.5 border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                            <SparklesIcon className="h-3.5 w-3.5" />
                            Contact & Support
                        </Badge>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
                            Parlons de votre projet,
                            <span className="mt-2 block bg-linear-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
                                construisons-le ensemble
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            Une question, un projet ou simplement envie
                            d’échanger ? Notre équipe est à votre écoute.
                        </p>
                    </motion.div>

                    {/* Quick contact cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-12 grid gap-4 sm:grid-cols-3"
                    >
                        {[
                            {
                                icon: MailIcon,
                                label: 'Email',
                                value: meta.email,
                            },
                            ...(meta.phone
                                ? [
                                      {
                                          icon: PhoneIcon,
                                          label: 'Téléphone',
                                          value: meta.phone,
                                      },
                                  ]
                                : []),
                            {
                                icon: MapPinIcon,
                                label: 'Localisation',
                                value: meta.location,
                            },
                        ].map((item, idx) => (
                            <Card
                                key={idx}
                                className="border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
                            >
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="rounded-full bg-teal-100 p-2.5 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                            {item.value}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FORM + INFO */}
            <section className="bg-white py-16 lg:py-20 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                        {/* Left column: engagements */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <Badge
                                    variant="outline"
                                    className="gap-1 border-teal-200 text-teal-700 dark:border-teal-800 dark:text-teal-300"
                                >
                                    <HeadphonesIcon className="h-3.5 w-3.5" />
                                    Support Premium
                                </Badge>
                                <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
                                    Un accompagnement sur mesure
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Notre équipe traite chaque demande avec
                                    attention. Réponse rapide, suivi
                                    personnalisé et solutions adaptées à vos
                                    besoins.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    {
                                        icon: Clock3Icon,
                                        title: 'Réponse rapide',
                                        description: `Première réponse en ${meta.responseTime}.`,
                                    },
                                    {
                                        icon: ShieldCheckIcon,
                                        title: 'Suivi structuré',
                                        description:
                                            'Chaque message est classé et suivi jusqu’à résolution.',
                                    },
                                    {
                                        icon: Users,
                                        title: 'Équipe dédiée',
                                        description:
                                            'Commercial, support et technique travaillent ensemble.',
                                    },
                                    {
                                        icon: ShieldCheckIcon,
                                        title: 'Confidentialité',
                                        description:
                                            'Vos données sont protégées et jamais partagées.',
                                    },
                                ].map((item, i) => (
                                    <Card
                                        key={i}
                                        className="border-slate-200 bg-white/60 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60"
                                    >
                                        <CardContent className="flex gap-4 p-5">
                                            <div className="rounded-full bg-teal-100 p-2.5 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Availability card */}
                            <Card className="border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20">
                                <CardContent className="p-5">
                                    <div className="flex items-center gap-3">
                                        <Clock3Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                Disponibilité
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {meta.supportHours} ·{' '}
                                                {meta.availability}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Right column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="overflow-hidden border-slate-200 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                                <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/50">
                                    <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                                        <MessageSquareTextIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                        Envoyez-nous un message
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Remplissez le formulaire ci-dessous,
                                        nous vous répondrons dans les plus brefs
                                        délais.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {recentlySuccessful ? (
                                        <div className="flex items-start gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-800 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                                            <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0" />
                                            <p className="text-sm">
                                                Votre message a bien été envoyé.
                                                Nous revenons vers vous
                                                rapidement.
                                            </p>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            {/* Catégories Carousel */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Catégorie
                                                </Label>
                                                <Carousel
                                                    opts={{
                                                        align: 'start',
                                                        dragFree: true,
                                                        containScroll:
                                                            'trimSnaps',
                                                    }}
                                                    className="w-full"
                                                >
                                                    <CarouselContent className="-ml-2 py-1">
                                                        {Object.entries(
                                                            categories,
                                                        ).map(
                                                            ([key, label]) => {
                                                                const CategoryIcon =
                                                                    categoryDetails[
                                                                        key
                                                                    ]?.icon ||
                                                                    Globe;
                                                                const isActive =
                                                                    data.categorie ===
                                                                    key;

                                                                return (
                                                                    <CarouselItem
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="basis-auto pl-2"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                setData(
                                                                                    'categorie',
                                                                                    key,
                                                                                )
                                                                            }
                                                                            className={cn(
                                                                                'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200',
                                                                                isActive
                                                                                    ? 'border-transparent bg-teal-600 text-white shadow-sm dark:bg-teal-500'
                                                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-700 dark:hover:bg-slate-800',
                                                                            )}
                                                                            aria-pressed={
                                                                                isActive
                                                                            }
                                                                        >
                                                                            <CategoryIcon
                                                                                className={cn(
                                                                                    'h-4 w-4 transition-colors duration-200',
                                                                                    isActive
                                                                                        ? 'text-white'
                                                                                        : 'text-slate-500 dark:text-slate-400',
                                                                                )}
                                                                            />
                                                                            <span>
                                                                                {
                                                                                    label
                                                                                }
                                                                            </span>
                                                                            {isActive && (
                                                                                <CheckCircle2Icon className="h-3.5 w-3.5 text-teal-200" />
                                                                            )}
                                                                        </button>
                                                                    </CarouselItem>
                                                                );
                                                            },
                                                        )}
                                                    </CarouselContent>
                                                    <CarouselPrevious className="absolute top-1/2 -left-4 h-8 w-8 -translate-y-1/2 border-slate-200 bg-white shadow-md backdrop-blur-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800" />
                                                    <CarouselNext className="absolute top-1/2 -right-4 h-8 w-8 -translate-y-1/2 border-slate-200 bg-white shadow-md backdrop-blur-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800" />
                                                </Carousel>
                                                <InputError
                                                    message={errors.categorie}
                                                />
                                            </div>

                                            {/* Nom & Prénom */}
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="nom"
                                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                    >
                                                        Nom
                                                    </Label>
                                                    <div className="relative">
                                                        <UserIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <Input
                                                            id="nom"
                                                            value={data.nom}
                                                            onChange={(e) =>
                                                                setData(
                                                                    'nom',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Dupont"
                                                            className="h-12 border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={errors.nom}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="prenom"
                                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                    >
                                                        Prénom
                                                    </Label>
                                                    <div className="relative">
                                                        <UserIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <Input
                                                            id="prenom"
                                                            value={data.prenom}
                                                            onChange={(e) =>
                                                                setData(
                                                                    'prenom',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Jean"
                                                            className="h-12 border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={errors.prenom}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email & Téléphone */}
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="email"
                                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                    >
                                                        Email
                                                    </Label>
                                                    <div className="relative">
                                                        <MailIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={data.email}
                                                            onChange={(e) =>
                                                                setData(
                                                                    'email',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="jean@exemple.com"
                                                            className="h-12 border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={errors.email}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="telephone"
                                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                    >
                                                        Téléphone
                                                    </Label>
                                                    <div className="relative">
                                                        <PhoneIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <Input
                                                            id="telephone"
                                                            value={
                                                                data.telephone
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'telephone',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="+33 6 12 34 56 78"
                                                            className="h-12 border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.telephone
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Sujet */}
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="sujet"
                                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                >
                                                    Sujet
                                                </Label>
                                                <div className="relative">
                                                    <MessageSquareTextIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                    <Input
                                                        id="sujet"
                                                        value={data.sujet}
                                                        onChange={(e) =>
                                                            setData(
                                                                'sujet',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Demande de renseignements"
                                                        className="h-12 border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.sujet}
                                                />
                                            </div>

                                            {/* Message */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label
                                                        htmlFor="message"
                                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                                    >
                                                        Message
                                                    </Label>
                                                    <motion.span
                                                        key={
                                                            data.message.length
                                                        }
                                                        initial={{ scale: 0.9 }}
                                                        animate={{ scale: 1 }}
                                                        className="text-xs text-slate-400"
                                                    >
                                                        {data.message.length}
                                                        /5000
                                                    </motion.span>
                                                </div>
                                                <Textarea
                                                    id="message"
                                                    value={data.message}
                                                    onChange={(e) =>
                                                        setData(
                                                            'message',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Décrivez votre demande en détail..."
                                                    rows={7}
                                                    className="min-h-40 resize-none border-slate-300 pl-10 text-base focus:border-teal-500 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                />
                                                <InputError
                                                    message={errors.message}
                                                />
                                            </div>

                                            {/* Category hint */}
                                            <motion.div
                                                key={data.categorie}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="flex items-center gap-3 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800"
                                            >
                                                <SelectedCategoryIcon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                                <span className="text-slate-600 dark:text-slate-300">
                                                    {
                                                        categoryDetails[
                                                            data.categorie
                                                        ]?.description
                                                    }
                                                </span>
                                            </motion.div>

                                            <Separator className="bg-slate-200 dark:bg-slate-700" />

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="h-12 w-full bg-teal-600 text-base font-semibold text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <>
                                                        <LoaderIcon className="h-6 w-6 animate-spin" />{' '}
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-6 w-6" />{' '}
                                                        Envoyer le message
                                                    </>
                                                )}
                                            </Button>
                                            <p className="text-center text-xs text-slate-400">
                                                Vos données sont traitées avec
                                                la plus grande confidentialité.
                                            </p>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 lg:py-20 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-10 text-center">
                        <Badge className="mb-4 border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                            FAQ
                        </Badge>
                        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
                            Questions fréquentes
                        </h2>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Tout ce que vous devez savoir avant de nous
                            contacter.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                q: 'Quel est le délai de réponse ?',
                                a: `Nous répondons généralement en ${meta.responseTime}.`,
                            },
                            {
                                q: 'Puis-je demander un devis ?',
                                a: 'Oui, sélectionnez la catégorie "Commercial" et décrivez votre projet.',
                            },
                            {
                                q: 'Le support est-il gratuit ?',
                                a: 'Oui, le support client est inclus pour tous nos services.',
                            },
                            {
                                q: 'Comment suivre ma demande ?',
                                a: 'Vous recevrez un email de confirmation avec un numéro de ticket.',
                            },
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className="border-slate-200 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <CardHeader>
                                    <CardTitle className="text-base text-slate-900 dark:text-white">
                                        {item.q}
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        {item.a}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);
export default Contact;
