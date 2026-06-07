import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { cn } from '@/lib/utils';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Code de récupération',
                description:
                    'Veuillez entrer l’un de vos codes de récupération d’urgence pour confirmer votre accès.',
                toggleText: 'utiliser un code d’authentification',
            };
        }

        return {
            title: 'Code d’authentification',
            description:
                'Entrez le code à 6 chiffres fourni par votre application d’authentification.',
            toggleText: 'utiliser un code de récupération',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Vérification en deux étapes" />

            <div className="space-y-6">
                <Form
                    {...store.form()}
                    className="space-y-5"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Code de récupération"
                                        autoFocus={showRecoveryInput}
                                        required
                                        className={cn(
                                            'h-11 rounded-xl border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur transition-all duration-200 placeholder:text-slate-400',
                                            'hover:border-teal-300 hover:bg-white',
                                            'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
                                            'dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500',
                                            'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                                            'dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                            errors.recovery_code &&
                                                'border-red-400 focus:border-red-500 dark:border-red-500',
                                        )}
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            autoFocus
                                        >
                                            <InputOTPGroup className="gap-2">
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            className={cn(
                                                                'h-14 w-12 rounded-xl border-slate-200 bg-white/80 text-xl font-bold text-slate-900 shadow-sm backdrop-blur transition-all duration-200',
                                                                'dark:border-slate-700 dark:bg-slate-900/80 dark:text-white',
                                                                'focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:focus:border-teal-400 dark:focus:ring-teal-400/20',
                                                            )}
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="h-11 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300 dark:bg-teal-500 dark:shadow-teal-900/30 dark:hover:bg-teal-600 dark:hover:shadow-teal-800/40"
                                disabled={processing}
                            >
                                Continuer
                            </Button>

                            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                <span>ou vous pouvez </span>
                                <button
                                    type="button"
                                    className="cursor-pointer font-medium text-teal-600 underline decoration-teal-300 underline-offset-4 transition-colors duration-300 hover:text-teal-700 hover:decoration-teal-500 dark:text-teal-400 dark:decoration-teal-700 dark:hover:text-teal-300 dark:hover:decoration-teal-400"
                                    onClick={() =>
                                        toggleRecoveryMode(clearErrors)
                                    }
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
