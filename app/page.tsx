import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeCarousel from "@/components/home/Carousel";
import FeatureSection from "@/components/home/FeatureSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero section with carousel */}
      <HomeCarousel />
      
      {/* Welcome section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Khodiyar Alumni Portal</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with fellow alumni, stay updated on campus events, and build a network that lasts a lifetime.
            Join our community today and rediscover the bonds that were formed during your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/register">Join the Community</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <FeatureSection />
      
      {/* Upcoming events preview */}
      <UpcomingEvents />
      
      {/* Stats section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-primary mb-2">5000+</p>
              <p className="text-gray-600">Alumni</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-primary mb-2">200+</p>
              <p className="text-gray-600">Events Per Year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-primary mb-2">30+</p>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}