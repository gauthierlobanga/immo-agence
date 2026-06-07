import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Inscription" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* Nom complet */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Nom complet
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Votre nom complet"
                                    className={cn(
                                        'h-11 rounded-xl border-slate-200 bg-white/80 text-slate-900 placeholder:text-slate-400 shadow-sm backdrop-blur transition-all duration-200',
                                        'hover:border-teal-300 hover:bg-white',
                                        'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                        'dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500',
                                        'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                        'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                        errors.name &&
                                            'border-red-400 focus:border-red-500 dark:border-red-500',
                                    )}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
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
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
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

                            {/* Mot de passe */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Mot de passe
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="••••••••"
                                    passwordrules={passwordRules}
                                    className={cn(
                                        errors.password &&
                                            'border-red-400 focus:border-red-500 dark:border-red-500',
                                    )}
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirmation du mot de passe */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Confirmer le mot de passe
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="••••••••"
                                    passwordrules={passwordRules}
                                    className={cn(
                                        errors.password_confirmation &&
                                            'border-red-400 focus:border-red-500 dark:border-red-500',
                                    )}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* Bouton d'inscription */}
                            <Button
                                type="submit"
                                className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="h-4 w-4" />
                                        Création en cours...
                                    </span>
                                ) : (
                                    'Créer un compte'
                                )}
                            </Button>
                        </div>

                        {/* Lien vers la connexion */}
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                            Déjà un compte ?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                Se connecter
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Créer un compte',
    description: 'Remplissez les champs ci-dessous pour créer votre compte.',
};
