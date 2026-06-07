import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Connexion" />

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
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
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
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
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                    >
                                        Mot de passe
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                                            tabIndex={5}
                                        >
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className={cn(
                                        errors.password &&
                                            'border-red-400 focus:border-red-500 dark:border-red-500',
                                    )}
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Se souvenir de moi */}
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 dark:border-slate-600 dark:text-teal-400"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Se souvenir de moi
                                </Label>
                            </div>

                            {/* Bouton de connexion */}
                            <Button
                                type="submit"
                                className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="h-4 w-4" />
                                        Connexion en cours...
                                    </span>
                                ) : (
                                    'Se connecter'
                                )}
                            </Button>
                        </div>

                        {/* Lien vers l’inscription */}
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                            Pas encore de compte ?{' '}
                            <TextLink
                                href={register()}
                                tabIndex={5}
                                className="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                Créer un compte
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {/* Message de statut */}
            {status && (
                <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-3 text-center text-sm font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Connexion à votre compte',
    description: 'Entrez votre email et votre mot de passe pour accéder à votre espace.',
};
