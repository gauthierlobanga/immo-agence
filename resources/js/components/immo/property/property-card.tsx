"use client";

import { Link } from "@inertiajs/react";
import { Heart, Bed, Bath, Square, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/types/immo/property";


interface Props {
    property: Property;
    variant?: 'grid' | 'list';
}

export function PropertyCard({ property, variant = 'grid' }: Props) {
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: property.currency
  }).format(property.price);

  if (variant === 'list') {
    return (
        <Card className="group overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900">
            <div className="flex flex-col md:flex-row">
                <div className="relative shrink-0 md:w-80 aspect-video md:aspect-square overflow-hidden">
                    <Link href={route('properties.show', property.slug)}>
                        <img
                            src={property.main_image}
                            alt={property.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </Link>
                    {property.is_verified && (
                        <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-600 border-0">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Vérifié
                        </Badge>
                    )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                        <Link href={route('properties.show', property.slug)}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors">
                                {property.title}
                            </h3>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{property.city?.name}, {property.address}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-xl font-black text-emerald-600">{formattedPrice}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Prix</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 dark:text-white">{property.area} m²</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Surface</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-slate-900 dark:text-white">{property.bedrooms} Ch.</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{property.bathrooms} Sdb</p>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4">
                        <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-8" asChild>
                            <Link href={route('properties.show', property.slug)}>Voir les détails</Link>
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-lg border-0 transition-all duration-300 bg-white dark:bg-slate-900">
      <div className="relative aspect-4/3 overflow-hidden">
        <Link href={route('properties.show', property.slug)}>
          <img
            src={property.main_image}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-slate-900 shadow-md">
          <Heart className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-emerald-600 text-white border-0 py-1 px-3 text-sm font-semibold shadow-md">
            {property.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={route('properties.show', property.slug)}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors truncate">
              {property.title}
            </h3>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 truncate">{property.city?.name}, {property.address}</p>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-black text-emerald-600">
            {formattedPrice}
          </p>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-emerald-500" />
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-emerald-500" />
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-5 w-5 text-emerald-500" />
            <span className="font-medium">{property.area} m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
