// resources/js/components/app-content.tsx
import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { AppVariant } from '@/types';

type Props = React.ComponentProps<'main'> & {
    variant?: AppVariant;
};

export function AppContent({ variant = 'sidebar', children, className, ...props }: Props) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset
                className={cn(
                    'bg-slate-50/50 transition-colors duration-500 dark:bg-slate-950/50',
                    className,
                )}
                {...props}
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            className={cn(
                'mx-auto flex h-full w-full flex-1 flex-col gap-4 rounded-lg',
                'text-slate-900 transition-colors duration-500 dark:text-slate-100',
                className,
            )}
            {...props}
        >
            {children}
        </main>
    );
}
