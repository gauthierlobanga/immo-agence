/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    HelpCircleIcon,
    MailIcon,
    MessageCircleIcon,
    ChevronDownIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppPublicLayout from '@/layouts/app-public-layout';

const faqData = [
    {
        question: 'Comment publier une annonce immobilière ?',
        answer: 'Connectez-vous à votre espace agent, cliquez sur "Ajouter un bien", remplissez les informations et publiez. Votre annonce sera visible après validation par notre équipe.',
        category: 'Publication',
    },
    {
        question: 'Quels sont les délais de publication ?',
        answer: "Les annonces sont généralement validées dans un délai de 2 à 4 heures ouvrables. Vous recevrez une notification dès qu'elle sera en ligne.",
        category: 'Publication',
    },
    {
        question: 'Comment contacter un agent ?',
        answer: "Depuis la fiche du bien, utilisez le formulaire de contact ou les coordonnées affichées. Vous pouvez également appeler directement l'agence.",
        category: 'Contact',
    },
    {
        question: 'Puis-je modifier mon annonce après publication ?',
        answer: 'Oui, dans votre tableau de bord agent, cliquez sur "Modifier" en face du bien concerné. Les modifications seront soumises à une nouvelle validation.',
        category: 'Gestion',
    },
    {
        question: 'Comment fonctionne la recherche avancée ?',
        answer: 'Utilisez les filtres de type de bien, prix, localisation, nombre de chambres... Vous pouvez aussi trier par date, prix ou popularité.',
        category: 'Recherche',
    },
    {
        question: 'Est-ce que je peux enregistrer des biens favoris ?',
        answer: 'Oui, en vous connectant, cliquez sur le cœur en haut de chaque fiche pour sauvegarder vos biens préférés et les retrouver dans votre espace personnel.',
        category: 'Fonctionnalités',
    },
    {
        question: 'Comment signaler un problème technique ?',
        answer: 'Utilisez la page de contact en sélectionnant la catégorie "Technique", ou écrivez-nous à support@immo-rdc.cd.',
        category: 'Support',
    },
    {
        question: 'Y a-t-il des frais pour déposer une annonce ?',
        answer: "Le dépôt d'annonces est gratuit pour les agents partenaires. Des options premium sont disponibles pour mettre vos biens en avant.",
        category: 'Tarifs',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function FaqPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const categories = [...new Set(faqData.map((item) => item.category))];

    return (
        <>
            <Head title="FAQ - Questions fréquentes" />

            {/* Hero */}
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
                            Questions fréquentes
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            Trouvez rapidement des réponses à toutes vos
                            interrogations sur notre plateforme immobilière.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="bg-white py-16 lg:py-20 dark:bg-slate-950">
                <div className="mx-auto max-w-4xl px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {faqData.map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card
                                    className={`overflow-hidden border-slate-200 transition-all duration-300 dark:border-slate-800 ${
                                        openIndex === index
                                            ? 'shadow-lg ring-1 ring-teal-500/20 dark:ring-teal-400/20'
                                            : 'shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full bg-teal-100 p-2.5 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                                <HelpCircleIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-1 border-teal-200 text-xs text-teal-700 dark:border-teal-800 dark:text-teal-300"
                                                >
                                                    {item.category}
                                                </Badge>
                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    {item.question}
                                                </h3>
                                            </div>
                                        </div>
                                        <ChevronDownIcon
                                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                                                openIndex === index
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </button>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <Separator className="bg-slate-200 dark:bg-slate-800" />
                                            <div className="p-5 pt-4">
                                                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Card className="border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20">
                            <CardContent className="p-8">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                                    <MailIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                                    Vous n'avez pas trouvé votre réponse ?
                                </h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">
                                    Notre équipe est là pour vous aider.
                                    Contactez-nous par email ou via le
                                    formulaire.
                                </p>
                                <a
                                    href={route('page.contact')}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                                >
                                    <MessageCircleIcon className="h-4 w-4" />
                                    Nous contacter
                                </a>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

FaqPage.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);

export default FaqPage;
