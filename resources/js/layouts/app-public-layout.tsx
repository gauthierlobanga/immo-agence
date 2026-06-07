//src/layouts/app-public-layout.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import type { AppLayoutProps } from '@/types';
import FooterSection from './app/footer/app-footer';

export default function AppPublicLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster
                position="top-right"
                richColors
                closeButton
                expand={true}
                duration={5000}
            />
            <FooterSection />
        </AppLayoutTemplate>
    );
}
