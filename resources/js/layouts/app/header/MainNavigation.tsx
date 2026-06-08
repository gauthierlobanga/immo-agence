import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/types';

type Props = {
    items: NavItem[];
};

export function MainNavigation({ items }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
    };

    const handleMouseEnter = (index: number) => {
        clearTimer();
        setOpenIndex(index);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpenIndex(null);
        }, 200);
    };

    useEffect(() => {
        return () => clearTimer();
    }, []);

    return (
        <nav className="flex h-full items-center gap-6">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => item.content && handleMouseEnter(index)}
                    onMouseLeave={() => item.content && handleMouseLeave()}
                >
                    {item.content ? (
                        <>
                            <button
                                className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 focus:outline-none ${
                                    openIndex === index
                                        ? 'text-teal-600 dark:text-teal-400'
                                        : 'text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400'
                                }`}
                            >
                                {item.title}
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-300 ${
                                        openIndex === index
                                            ? 'rotate-180 text-teal-600'
                                            : 'text-slate-400 group-hover:text-teal-500'
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <>
                                        <div className="absolute top-full h-5 w-full" />
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 15 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.23, 1, 0.32, 1],
                                            }}
                                            className="fixed top-16 left-0 w-full border-b border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
                                            onMouseEnter={clearTimer}
                                        >
                                            <div className="mx-auto max-w-screen-2xl">
                                                {item.content}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <Link
                            href={item.href || '#'}
                            className="text-sm font-semibold text-slate-600 transition-all duration-300 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                        >
                            {item.title}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
