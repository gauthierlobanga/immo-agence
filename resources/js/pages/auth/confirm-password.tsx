import { Form, Head } from '@inertiajs/react';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirmer le mot de passe" />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label="Confirmer avec une passkey"
                loadingLabel="Confirmation..."
                separator="Ou confirmer avec le mot de passe"
            />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-5">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Mot de passe
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                autoFocus
                                className={cn(
                                    errors.password &&
                                        'border-red-400 focus:border-red-500 dark:border-red-500',
                                )}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <Button
                            className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="h-4 w-4" />
                                    Confirmation...
                                </span>
                            ) : (
                                'Confirmer le mot de passe'
                            )}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirmer le mot de passe',
    description:
        'Ceci est une zone sécurisée de l\'application. Veuillez confirmer votre mot de passe avant de continuer.',
};
