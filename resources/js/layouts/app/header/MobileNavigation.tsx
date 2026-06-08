import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface MobileNavigationProps {
    items: NavItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
    return (
        <div className="flex flex-col px-2">
            <Accordion type="single" collapsible className="w-full space-y-2">
                {items.map((item, index) => {
                    const hasContent = !!item.content;
                    const href =
                        typeof item.href === 'string'
                            ? item.href
                            : (item.href as any)?.url || '#';

                    if (hasContent) {
                        return (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-none"
                            >
                                <AccordionTrigger
                                    className={cn(
                                        'flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300',
                                        'text-slate-700 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-950/30 dark:hover:text-teal-400',
                                        '[&[data-state=open]]:bg-teal-50/50 [&[data-state=open]]:text-teal-700 dark:[&[data-state=open]]:bg-teal-950/20 dark:[&[data-state=open]]:text-teal-400',
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                        {item.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-4">
                                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/50 shadow-inner dark:border-slate-800 dark:bg-slate-900/50">
                                        {item.content}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={href}
                            className={cn(
                                'flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300',
                                'text-slate-700 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-teal-950/30 dark:hover:text-teal-400',
                                route().current(href + '*') &&
                                    'bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400',
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                {item.title}
                            </div>
                        </Link>
                    );
                })}
            </Accordion>
        </div>
    );
}
