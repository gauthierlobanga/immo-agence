"use client";

import { Heart, Bed, Bath, Square } from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const properties = [
  {
    id: 1,
    name: "Serenity Heights Villas",
    location: "Bogor Tengah",
    price: 385000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://images.unsplash.com/photo-1722491945502-abb7235593f2?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Emerald Bay Residences",
    location: "Gunungkidul, Yogyakarta",
    price: 295000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Palm Grove Estate",
    location: "Semarang Selatan",
    price: 420000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://images.unsplash.com/photo-1628116904346-44a605db3b6e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Golden Horizon Residences",
    location: "Malang Barat",
    price: 225000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://images.unsplash.com/photo-1713789290711-fbb4523a9b52?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Sapphire Riverfront Villas",
    location: "Jakarta Selatan",
    price: 340000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://plus.unsplash.com/premium_photo-1742418127279-c9a43d9acf2a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    name: "Sunset Cliffside Homes",
    location: "Surabaya Timur",
    price: 450000,
    bedrooms: 8,
    bathrooms: 2.5,
    area: 410,
    image:
      "https://plus.unsplash.com/premium_photo-1731192706116-328f15f063ca?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export default function PropertyListPage() {
  const [sortBy, setSortBy] = useState("default");

  const sortedProperties = useMemo(() => {
    const sorted = [...properties];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => b.id - a.id);
      default:
        return sorted;
    }
  }, [sortBy]);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-foreground font-heading mb-2 text-3xl">
              Residence in San Francisco
            </h1>
            <p className="text-muted-foreground">
              We found{" "}
              <span className="text-foreground font-medium">{sortedProperties.length}</span>{" "}
              property
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Sort By :</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden pt-0 shadow-none">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="h-64 w-full object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <CardContent>
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-foreground text-lg font-semibold">{property.name}</h3>
                  <Badge variant="secondary" className="ml-2 font-semibold">
                    ${property.price.toLocaleString()}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">{property.location}</p>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
