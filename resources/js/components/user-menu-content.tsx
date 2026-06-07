// resources/js/components/user-menu-content.tsx
import { Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    User2Icon,
} from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="px-2 py-2">
            {/* En-tête utilisateur */}
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 px-3 py-3 dark:bg-slate-800/50">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-2 bg-slate-200/60 dark:bg-slate-700/60" />

            {/* Liens rapides */}
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        href={route('dashboard')}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                        onClick={cleanup}
                    >
                        <LayoutDashboard className="h-4 w-4 text-slate-400 transition-colors group-hover:text-teal-600 dark:text-slate-500 dark:group-hover:text-teal-400" />
                        Tableau de bord
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href={edit()}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                        prefetch
                        onClick={cleanup}
                    >
                        <User2Icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-teal-600 dark:text-slate-500 dark:group-hover:text-teal-400" />
                        Paramètres du profil
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2 bg-slate-200/60 dark:bg-slate-700/60" />

            {/* Déconnexion */}
            <DropdownMenuItem asChild>
                <Link
                    className="block cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </div>
    );
}
