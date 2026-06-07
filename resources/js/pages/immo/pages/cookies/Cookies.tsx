import { Head } from '@inertiajs/react';
import AppPublicLayout from '@/layouts/app-public-layout';
import blog from '@/routes/blog';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: blog.index().url,
    },
];

function Cookies() {
    return (
        <>
            <Head title="Contactez-nous" />
            <section className="py-14 lg:py-20"></section>
        </>
    );
}


Cookies.layout = (page: React.ReactNode) => (
    <AppPublicLayout breadcrumbs={breadcrumbs}>{page}</AppPublicLayout>
);

export default Cookies;
