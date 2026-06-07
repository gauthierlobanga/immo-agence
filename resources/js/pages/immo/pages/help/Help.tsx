import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    SearchIcon,
    UserIcon,
    KeyIcon,
    FileTextIcon,
    HelpCircleIcon,
    MessageCircleIcon,
    ChevronDownIcon,
    MailIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppPublicLayout from '@/layouts/app-public-layout';

const helpGuides = [
    {
        icon: SearchIcon,
        title: 'Trouver un bien',
        description:
            'Apprenez à utiliser nos filtres avancés et la carte interactive.',
        link: '/properties',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    },
    {
        icon: HomeIcon,
        title: 'Acheter / Louer',
        description:
            'Les démarches, les documents nécessaires et nos conseils.',
        link: '/help/buying',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    },
    {
        icon: KeyIcon,
        title: 'Vendre / Mettre en location',
        description:
            'Comment publier une annonce efficace et attirer des acheteurs.',
        link: '/help/selling',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    },
    {
        icon: UserIcon,
        title: 'Mon compte',
        description: 'Gérez vos favoris, vos alertes et vos paramètres.',
        link: '/help/account',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    },
    {
        icon: FileTextIcon,
        title: 'Documents légaux',
        description:
            'Informations sur les titres fonciers, actes de vente, etc.',
        link: '/help/documents',
        color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    },
];

const faqItems = [
    {
        question: 'Comment contacter un agent ?',
        answer: 'Depuis la fiche du bien, utilisez le formulaire de contact ou les coordonnées affichées. Vous pouvez également appeler directement l’agence.',
    },
    {
        question: 'Puis-je modifier mon annonce après publication ?',
        answer: 'Oui, dans votre tableau de bord agent, cliquez sur "Modifier" en face du bien concerné. Les modifications seront soumises à une nouvelle validation.',
    },
    {
        question: 'Comment sont vérifiées les annonces ?',
        answer: 'Chaque annonce est examinée par notre équipe avant d’être publiée afin de garantir sa fiabilité et sa conformité.',
    },
    {
        question: 'Quels sont les délais de réponse ?',
        answer: 'Nous répondons généralement en moins de 24 heures ouvrables.',
    },
];

function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <>
            <Head title="Aide - Centre d'assistance" />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-teal-50 via-white to-slate-50 px-4 py-20 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-teal-200/20 blur-[120px] dark:bg-teal-800/10" />
                    <div className="absolute -right-40 -bottom-40 h-125 w-125 rounded-full bg-slate-300/20 blur-[120px] dark:bg-slate-700/10" />
                </div>

                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5"
                    >
                        <Badge className="gap-1.5 border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-700 dark:border-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                            <HelpCircleIcon className="h-3.5 w-3.5" />
                            Centre d'aide
                        </Badge>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
                            Besoin d'aide ?
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            Trouvez rapidement des réponses à vos questions et
                            apprenez à tirer le meilleur parti de notre
                            plateforme immobilière.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Guides rapides */}
            <section className="bg-white py-16 lg:py-20 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 text-center"
                    >
                        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
                            Guides thématiques
                        </h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Sélectionnez un sujet pour en savoir plus.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {helpGuides.map((guide, idx) => (
                            <motion.div
                                key={guide.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={guide.link}>
                                    <Card className="group h-full border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10 dark:border-slate-800 dark:hover:shadow-teal-400/10">
                                        <CardContent className="flex flex-col items-center p-6 text-center">
                                            <div
                                                className={`mb-4 rounded-full p-3 ${guide.color}`}
                                            >
                                                <guide.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                {guide.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                                {guide.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="mx-auto max-w-3xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 text-center"
                    >
                        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
                            Questions courantes
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="overflow-hidden border-slate-200 transition-all duration-300 dark:border-slate-800">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex w-full items-center justify-between p-5 text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full bg-teal-100 p-2 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                                <HelpCircleIcon className="h-4 w-4" />
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                                                {item.question}
                                            </h3>
                                        </div>
                                        <ChevronDownIcon
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                                                openFaq === index
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </button>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Separator className="bg-slate-200 dark:bg-slate-800" />
                                            <div className="p-5 pt-4">
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-white py-16 lg:py-20 dark:bg-slate-950">
                <div className="mx-auto max-w-3xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-teal-200 bg-teal-50 text-center dark:border-teal-800 dark:bg-teal-900/20">
                            <CardContent className="p-8">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                    <MailIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                                    Vous ne trouvez pas votre réponse ?
                                </h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">
                                    Notre équipe est là pour vous aider.
                                    Contactez-nous par email ou via le
                                    formulaire.
                                </p>
                                <Link href={route('page.contact')}>
                                    <Button className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                                        <MessageCircleIcon className="h-4 w-4" />
                                        Nous contacter
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

HelpPage.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);

export default HelpPage;
