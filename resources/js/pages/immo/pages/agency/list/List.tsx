import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, MapPin, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppPublicLayout from '@/layouts/app-public-layout';

interface Agency {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo_url: string;
    banner_url: string;
    is_verified: boolean;
    properties_count: number;
    address: string;
}

interface Props {
    agencies: {
        data: Agency[];
        meta: any;
        links: any;
    };
}

function AgencyList({ agencies }: Props) {
  return (
    <>
      <Head title="Nos Agences Partenaires" />

      <section className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen">
        <div className="mx-auto max-w-7xl px-4">

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Agences Immobilières
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Trouvez l'agence qui vous accompagnera dans votre projet immobilier parmi nos partenaires certifiés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencies.data.map((agency) => (
              <Card key={agency.id} className="group overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all bg-white dark:bg-slate-900">
                <div className="relative h-32 bg-emerald-600">
                    {agency.banner_url && (
                        <img src={agency.banner_url} className="h-full w-full object-cover opacity-50" />
                    )}
                    <div className="absolute -bottom-10 left-6">
                        <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-md overflow-hidden">
                            <img src={agency.logo_url || `https://ui-avatars.com/api/?name=${agency.name}&background=random`} className="h-full w-full object-contain rounded-xl" />
                        </div>
                    </div>
                </div>

                <CardContent className="pt-14 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {agency.name}
                    </h3>
                    {agency.is_verified && <BadgeCheck className="h-5 w-5 text-emerald-500 fill-emerald-50" />}
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{agency.address || 'Kinshasa, RDC'}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6">
                    {agency.description || "Cette agence n'a pas encore de description détaillée."}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <Building2 className="h-5 w-5 text-emerald-600" />
                        <span className="font-bold">{agency.properties_count}</span>
                        <span className="text-sm text-slate-500">Biens</span>
                    </div>
                    <Button variant="ghost" className="rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600" asChild>
                        <Link href={route('agencies.show', agency.slug)}>
                            Voir l'agence
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {agencies.meta.last_page > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {agencies.links.map((link: any, i: number) => (
                    <Button
                        key={i}
                        variant={link.active ? 'default' : 'outline'}
                        className="rounded-xl"
                        asChild
                        disabled={!link.url}
                    >
                        <Link
                            href={link.url || '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveState
                        />
                    </Button>
                ))}
              </div>
          )}
        </div>
      </section>
    </>
  );
}

AgencyList.layout = (page: React.ReactNode) => (
    <AppPublicLayout>{page}</AppPublicLayout>
);

export default AgencyList;
