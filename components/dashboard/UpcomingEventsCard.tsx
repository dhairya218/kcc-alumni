"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "evt-1",
    title: "Annual Alumni Meet 2025",
    date: "2025-03-15T09:00:00",
    location: "Main Campus Auditorium",
    type: "networking",
    attendees: 156,
    description: "Join us for the Annual Alumni Meet 2025 to reconnect with your classmates and build your professional network."
  },
  {
    id: "evt-2",
    title: "Career Fair Spring 2025",
    date: "2025-04-10T10:00:00",
    location: "Engineering Block",
    type: "career",
    attendees: 89,
    description: "Connect with top employers from various industries looking to hire talented graduates and alumni."
  },
  {
    id: "evt-3",
    title: "Technical Workshop: AI & Machine Learning",
    date: "2025-02-28T14:00:00",
    location: "Computer Science Department",
    type: "workshop",
    attendees: 42,
    description: "Learn about the latest advancements in AI and machine learning from industry experts and academic leaders."
  },
  {
    id: "evt-4",
    title: "Entrepreneurship Summit",
    date: "2025-05-20T11:00:00",
    location: "Business School Conference Hall",
    type: "conference",
    attendees: 112,
    description: "A day-long summit featuring successful entrepreneurs, investors, and startup mentors to guide aspiring business leaders."
  }
];

interface UpcomingEventsCardProps {
  expanded?: boolean;
}

export default function UpcomingEventsCard({ expanded = false }: UpcomingEventsCardProps) {
  const eventsToShow = expanded ? upcomingEvents : upcomingEvents.slice(0, 2);
  
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
  
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'networking': return 'default';
      case 'career': return 'secondary';
      case 'workshop': return 'outline';
      case 'conference': return 'destructive';
      default: return 'default';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Events you might be interested in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {eventsToShow.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <Badge variant={getBadgeVariant(event.type)} className="capitalize">
                {event.type}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {event.description}
            </p>
            
            <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button size="sm" variant="outline">Details</Button>
              <Button size="sm">Register</Button>
            </div>
          </div>
        ))}
      </CardContent>
      
      {!expanded && (
        <CardFooter className="justify-center">
          <Button asChild variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}