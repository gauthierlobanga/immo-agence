import { usePage } from '@inertiajs/react';
import AppearanceToogle from '@/components/appearance-toogle';
import { NotificationsDropdown } from './NotificationsDropdown';
import { RegionSelectorForm } from './RegionSelectorForm';

export function HeaderActions() {
    const { auth } = usePage().props;

    return (
        <>
            {/* Region & Language Selector */}
            <RegionSelectorForm />

            {/* Theme Toggle */}
            <AppearanceToogle />

            {/* Notifications - Visible uniquement pour utilisateurs connectés */}
            {auth.user && <NotificationsDropdown />}
        </>
    );
}
