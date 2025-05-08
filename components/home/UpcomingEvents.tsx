"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

// Featured upcoming events
const upcomingEvents = [
  {
    id: "evt-1",
    title: "Annual Alumni Meet 2025",
    date: "2025-03-15T09:00:00",
    location: "Main Campus Auditorium",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
  },
  {
    id: "evt-2",
    title: "Career Fair Spring 2025",
    date: "2025-04-10T10:00:00",
    location: "Engineering Block",
    image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg",
  },
  {
    id: "evt-3",
    title: "Technical Workshop: AI & Machine Learning",
    date: "2025-02-28T14:00:00",
    location: "Computer Science Department",
    image: "https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg",
  },
];

export default function UpcomingEvents() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join us for these exciting events and connect with the Khodiyar community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div 
                className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${event.image})` }}
              />
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTime(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Button asChild>
                  <Link href={`/events#${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}