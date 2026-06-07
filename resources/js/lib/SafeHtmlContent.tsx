import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface SafeHtmlContentProps {
    html: string;
    className?: string;
    sanitize?: boolean;
}

export function SafeHtmlContent({ html, className, sanitize = true }: SafeHtmlContentProps) {
    const cleanHtml = sanitize ? DOMPurify.sanitize(html) : html;

    return (
        <div
            className={cn(
                // Base
                'prose prose-slate max-w-none',
                // Mode sombre inversé (gère automatiquement les couleurs de base)
                'dark:prose-invert',

                // --- Paragraphes ---
                'prose-p:leading-relaxed prose-p:mb-4 prose-p:text-slate-700 dark:prose-p:text-slate-400',

                // --- Titres ---
                'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-200',
                'prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4',
                'prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-teal-200 prose-h2:pb-2 dark:prose-h2:border-teal-800',
                'prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-teal-700 dark:prose-h3:text-teal-400',

                // --- Liens ---
                'prose-a:text-teal-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline dark:prose-a:text-teal-400',

                // --- Listes ---
                'prose-li:text-slate-600 dark:prose-li:text-slate-400',

                // --- Citations ---
                'prose-blockquote:border-l-4 prose-blockquote:border-teal-400 prose-blockquote:bg-slate-50/80 prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:border-teal-600 dark:prose-blockquote:bg-slate-800/50 dark:prose-blockquote:text-slate-400',

                // --- Code inline ---
                'prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-teal-700 dark:prose-code:bg-slate-800 dark:prose-code:text-teal-300',

                // --- Blocs de code ---
                'prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-50 dark:prose-pre:border-slate-700 dark:prose-pre:bg-slate-900',

                // --- Images ---
                'prose-img:rounded-2xl prose-img:shadow-lg prose-img:shadow-slate-200/50 dark:prose-img:shadow-slate-900/50',

                // --- Séparateur ---
                'prose-hr:border-teal-200 dark:prose-hr:border-teal-800',

                // --- Tableaux ---
                'prose-table:border-separate prose-th:bg-slate-50 prose-th:rounded-t-lg dark:prose-th:bg-slate-800',
                'prose-td:border-slate-200 dark:prose-td:border-slate-700',

                // --- Texte en gras ---
                'prose-strong:text-slate-900 dark:prose-strong:text-slate-200',

                // Classes additionnelles
                className,
            )}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
}
