"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    pricePerSqFt: 939,
    bedrooms: 3,
    bathrooms: 2,
    area: 410,
    areaInSqM: 38,
    image:
      "https://images.unsplash.com/photo-1722491945502-abb7235593f2?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Spacious modern villa with contemporary design, featuring open-plan living areas, premium finishes, and beautiful garden. Perfect for families seeking luxury living.",
    verified: true,
    postedDate: "March 15, 2020",
    owner: "Sarah Johnson"
  },
  {
    id: 2,
    name: "Emerald Bay Residences",
    location: "Gunungkidul, Yogyakarta",
    price: 295000,
    pricePerSqFt: 719,
    bedrooms: 2,
    bathrooms: 2,
    area: 410,
    areaInSqM: 38,
    image:
      "https://images.unsplash.com/photo-1628624747295-ea5e7fc3d76f?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Modern residential complex with wooden facade and excellent amenities. Swimming pool, gym, and children's play area. Perfect for small families looking for quality living.",
    verified: true,
    postedDate: "June 13, 2020",
    owner: "Mitchell Spencer"
  },
  {
    id: 3,
    name: "Palm Grove Estate",
    location: "Semarang Selatan",
    price: 420000,
    pricePerSqFt: 1024,
    bedrooms: 4,
    bathrooms: 3,
    area: 410,
    areaInSqM: 38,
    image:
      "https://images.unsplash.com/photo-1628116904346-44a605db3b6e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Luxury villa with overhanging roof design and private pool. Contemporary architecture with high-end finishes and smart home features for modern living.",
    verified: false,
    postedDate: "April 22, 2020",
    owner: "Inez Freeman"
  },
  {
    id: 4,
    name: "Golden Horizon Residences",
    location: "Malang Barat",
    price: 225000,
    pricePerSqFt: 549,
    bedrooms: 2,
    bathrooms: 2,
    area: 410,
    areaInSqM: 38,
    image:
      "https://images.unsplash.com/photo-1713789290711-fbb4523a9b52?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Charming barn-style houses with wooden cladding. Semi-furnished unit with excellent amenities in a gated community. Great for first-time homebuyers.",
    verified: true,
    postedDate: "January 8, 2020",
    owner: "David Chen"
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
    <main>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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

        <div className="flex flex-col gap-6">
          {sortedProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden py-0">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative shrink-0 md:w-80">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="aspect-square w-full object-cover md:h-full"
                  />
                  {property.verified && (
                    <Badge
                      variant="secondary"
                      className="absolute top-4 left-4 border-green-200 bg-white text-green-600">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Title and Location */}
                  <div className="mb-4">
                    <h2 className="text-foreground mb-1 text-xl font-semibold">
                      {property.bedrooms} BHK Apartment in {property.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">{property.location}</p>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-6 border-b pb-4 sm:grid-cols-3">
                    {/* Price */}
                    <div>
                      <div className="text-foreground mb-1 text-2xl font-bold">
                        ${property.price.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        ${property.pricePerSqFt}/sq.ft.
                      </div>
                    </div>

                    {/* Area */}
                    <div>
                      <div className="text-foreground mb-1 text-2xl font-bold">
                        {property.area} sq.ft.
                      </div>
                      <div className="text-muted-foreground text-sm">
                        ({property.areaInSqM} sq.m.) Super built-up Area
                      </div>
                    </div>

                    {/* BHK */}
                    <div>
                      <div className="text-foreground mb-1 text-2xl font-bold">
                        {property.bedrooms} BHK
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {property.bathrooms} Baths
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {property.description}{" "}
                    <button className="text-primary font-medium hover:underline">More</button>
                  </p>

                  <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                      Contact Owner
                    </Button>
                    <p className="text-muted-foreground text-center text-xs sm:text-right">
                      Posted on {property.postedDate} by Owner {property.owner}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
