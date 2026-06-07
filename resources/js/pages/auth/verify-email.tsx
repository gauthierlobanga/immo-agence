import { Form, Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Vérification de l'email" />

            {status === 'verification-link-sent' && (
                <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50 p-4 text-center text-sm font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                    <Mail className="mx-auto mb-2 h-5 w-5" />
                    Un nouveau lien de vérification a été envoyé à l'adresse email
                    que vous avez fournie lors de votre inscription.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button
                            disabled={processing}
                            className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="h-4 w-4" />
                                    Envoi en cours...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Renvoyer l'email de vérification
                                </span>
                            )}
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm font-medium text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                        >
                            Se déconnecter
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Vérification de l\'email',
    description:
        'Veuillez vérifier votre adresse email en cliquant sur le lien que nous venons de vous envoyer.',
};
