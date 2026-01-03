import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { eventTypes, featuredVendors, aiTools } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function getImage(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image || PlaceHolderImages[0];
}

export default function DashboardPage() {
  const heroImage = getImage('hero-background');

  return (
    <div className="space-y-12">
      <section className="relative w-full h-[50vh] rounded-xl overflow-hidden">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Intelligent Event Planning, Simplified.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl drop-shadow-md">
            Vencorpia is your AI-powered ecosystem for creating unforgettable
            events with confidence and ease.
          </p>
          <Button asChild size="lg" className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/tools">
              Start Planning with AI <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <PageHeader
          title="Plan Your Perfect Event"
          description="Whatever the occasion, find everything you need in one place."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {eventTypes.map((eventType) => {
            const image = getImage(eventType.image);
            return (
              <Card key={eventType.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-40 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <eventType.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">{eventType.title}</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">{eventType.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <PageHeader
          title="Featured Vendors"
          description="Discover top-rated professionals for your event."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {featuredVendors.map((vendor) => {
             const image = getImage(vendor.image);
            return (
              <Card key={vendor.name} className="overflow-hidden group">
                 <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                <CardHeader>
                  <CardTitle>{vendor.name}</CardTitle>
                  <CardDescription>{vendor.service}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center space-x-1 text-accent">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
      
      <section>
        <PageHeader
          title="AI-Powered Tools"
          description="Leverage our intelligent assistants to build the perfect event."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {aiTools.map((tool) => {
            const image = getImage(tool.image);
            return (
               <Card key={tool.title} className="group overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <CardTitle className="absolute bottom-4 left-4 text-2xl text-white drop-shadow-md">{tool.title}</CardTitle>
                </div>
                <CardContent className="p-4 flex-grow">
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="outline" className="w-full">
                     <Link href={tool.link}>
                       Try Now <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}
