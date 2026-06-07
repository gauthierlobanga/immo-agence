import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Réinitialiser le mot de passe" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-5">
                        {/* Email (lecture seule) */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                readOnly
                                className={cn(
                                    'h-11 rounded-xl border-slate-200 bg-slate-50 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
                                )}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Nouveau mot de passe */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Nouveau mot de passe
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
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
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                passwordrules={passwordRules}
                                className={cn(
                                    errors.password_confirmation &&
                                        'border-red-400 focus:border-red-500 dark:border-red-500',
                                )}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Bouton de réinitialisation */}
                        <Button
                            type="submit"
                            className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="h-4 w-4" />
                                    Réinitialisation...
                                </span>
                            ) : (
                                'Réinitialiser le mot de passe'
                            )}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Réinitialiser le mot de passe',
    description: 'Veuillez entrer votre nouveau mot de passe ci-dessous.',
};
