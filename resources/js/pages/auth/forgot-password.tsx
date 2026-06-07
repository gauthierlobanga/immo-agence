import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Mot de passe oublié" />

            {status && (
                <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 p-3 text-center text-sm font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Adresse email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="vous@exemple.com"
                                    className={cn(
                                        'h-11 rounded-xl border-slate-200 bg-white/80 text-slate-900 placeholder:text-slate-400 shadow-sm backdrop-blur transition-all duration-200',
                                        'hover:border-teal-300 hover:bg-white',
                                        'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                        'dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500',
                                        'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                        'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                        errors.email &&
                                            'border-red-400 focus:border-red-500 dark:border-red-500',
                                    )}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="mt-6">
                                <Button
                                    className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                            Envoi en cours...
                                        </span>
                                    ) : (
                                        'Envoyer le lien de réinitialisation'
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Revenir à la{' '}
                    <TextLink
                        href={login()}
                        className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                        connexion
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Mot de passe oublié',
    description: 'Entrez votre email pour recevoir un lien de réinitialisation.',
};
