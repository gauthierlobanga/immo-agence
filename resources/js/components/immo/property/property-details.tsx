import {
  MapPin,
  Star,
  Bed,
  Bath,
  Maximize,
  Cigarette,
  ChefHat,
  Home,
  Wifi,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const iconMap = {
  bed: Bed,
  bath: Bath,
  maximize: Maximize,
  smoking: Cigarette,
  "chef-hat": ChefHat,
  home: Home,
  wifi: Wifi,
  car: Car
};

const property = {
  name: "Veloura Residences",
  location: "Miami, Florida, celinam delware 2098",
  price: 4050,
  rating: 4.9,
  images: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000"
  ],
  description:
    "Discover this modern 3-bedroom apartment located in the heart of the city, offering a perfect blend of comfort and convenience. Enjoy breathtaking skyline views, an open-concept kitchen, spacious living areas, and a private balcony ideal for relaxing evenings.",
  bedrooms: 2,
  bathrooms: 3,
  area: 10000,
  amenities: [
    { icon: "bed", label: "2 Beds" },
    { icon: "bath", label: "3 Baths" },
    { icon: "maximize", label: "10k sq ft" },
    { icon: "smoking", label: "Smocking Area" },
    { icon: "chef-hat", label: "Kitchen" },
    { icon: "home", label: "balcony" },
    { icon: "wifi", label: "Wifi" },
    { icon: "car", label: "Parking Area" }
  ],
  status: "For Sale",
  fullLocation: "118 Bel Air Rd, Los Angeles",
  livingSpace: "10,00 sq ft",
  agent: {
    name: "Alex Ripon",
    address: "687 3rd Ave, New York, USA",
    phone1: "+2224555597",
    phone2: "+3334555596",
    whatsapp: "3334555595",
    email: "alexripon@example.com",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=200"
  },
  propertyId: "66R986"
};

export default function PropertyShowPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 lg:py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image Gallery */}
          <div className="grid grid-cols-3 gap-3">
            <div className="relative col-span-3 aspect-4/3 overflow-hidden rounded-2xl md:col-span-2">
              <img src={property.images[0]} alt={property.name} className="object-cover" />
            </div>
            <div className="col-span-3 grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-1">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <img
                  src={property.images[1]}
                  alt={`${property.name} view 2`}
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <img
                  src={property.images[2]}
                  alt={`${property.name} view 3`}
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-3xl font-bold text-white">7+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-foreground font-heading text-3xl lg:text-4xl">{property.name}</h1>
              <div className="text-foreground text-3xl font-semibold whitespace-nowrap lg:text-3xl">
                {formatPrice(property.price)}{" "}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.location}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span>{property.rating}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-foreground font-bold">Key Features</h2>

            <Card className="shadow-none">
              <CardContent>
                <h3 className="mb-4 font-semibold">Amenities</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {property.amenities.map((amenity, index) => {
                    const Icon = iconMap[amenity.icon as keyof typeof iconMap] || Home;

                    return (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Icon className="text-muted-foreground h-4 w-4" />
                        <span>{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Areas & Lot */}
          <div className="space-y-4">
            <h2 className="text-foreground font-bold">Areas & Lot</h2>
            <Card className="shadow-none">
              <CardContent className="divide-y text-sm [&_div]:flex [&_div]:items-center [&_div]:justify-between [&_div]:py-4 [&_div]:first:pt-0 [&_div]:last:pb-0">
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{property.status}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{property.fullLocation}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Living Space</span>
                  <span className="font-medium">{property.livingSpace}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="bg-muted/50 shadow-none">
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold">{property.agent.name}</h3>
                  <p className="text-muted-foreground text-sm">{property.agent.address}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Office Phone:</span>
                  <span className="font-medium">{property.agent.phone1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Office Phone:</span>
                  <span className="font-medium">{property.agent.phone2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp:</span>
                  <span className="font-medium">{property.agent.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{property.agent.email}</span>
                </div>
              </div>

              <Button className="w-full">View My Property</Button>
            </CardContent>
          </Card>

          {/* Schedule Tour Card */}
          <Card className="bg-muted/50 shadow-none">
            <CardHeader>
              <CardTitle>Schedule tour</CardTitle>
              <CardDescription>
                See your future home up close — book a tour with Real Nest today and let us help you
                find the perfect place!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Property ID</Label>
                  <Input value={property.propertyId} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Property Name</Label>
                  <Input value={property.name} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Full Name</Label>
                  <Input placeholder="Enter your full name" />
                </div>

                <Button className="w-full">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
