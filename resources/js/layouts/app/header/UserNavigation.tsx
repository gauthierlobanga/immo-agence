/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from '@inertiajs/react';
import { ChevronDown, LogIn, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { login } from '@/routes';
import type { User } from '@/types';

interface UserNavigationProps {
    user: User | null;
}

export function UserNavigation({ user }: UserNavigationProps) {
    const getInitials = useInitials();

    // ----- État non connecté -----
    if (!user) {
        return (
            <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                    'group h-10 rounded-xl border px-4 text-sm font-medium transition-all duration-300',
                    'border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur',
                    'hover:border-teal-300 hover:bg-white hover:text-teal-700',
                    'dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
                    'dark:hover:border-teal-600 dark:hover:text-teal-400',
                )}
            >
                <Link href={login()}>
                    <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Connexion
                </Link>
            </Button>
        );
    }

    // ----- État connecté -----
    const avatarUrl =
        user.avatar_url?.startsWith('http') || user.avatar_url?.startsWith('/')
            ? user.avatar_url
            : undefined;

    const userName = user.name || 'Utilisateur';
    const userInitials = getInitials(userName);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        'group relative h-11 rounded-xl px-1.5 pr-3 transition-all duration-300',
                        'border border-slate-200/80 bg-white/80 ',
                        'hover:border-teal-300 hover:bg-white',
                        'dark:border-slate-700 dark:bg-slate-900/80',
                        'dark:hover:border-teal-700 dark:hover:bg-slate-900',
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-teal-100 dark:ring-teal-900/50">
                            {avatarUrl ? (
                                <AvatarImage src={avatarUrl} alt={userName} />
                            ) : (
                                <AvatarFallback className="bg-teal-600 text-xs font-bold text-white">
                                    {userInitials}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <span className="hidden text-sm font-medium text-slate-700 sm:inline dark:text-slate-200">
                            {userName}
                        </span>

                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={12}
                className={cn(
                    'w-80 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-2xl backdrop-blur-xl',
                    'dark:border-slate-800/70 dark:bg-slate-950/95 dark:shadow-black/40',
                    'animate-in duration-200 fade-in-0 zoom-in-95 slide-in-from-top-2',
                )}
            >
                <UserMenuContent user={user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
