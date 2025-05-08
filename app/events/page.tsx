"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for events
const eventsData = [
  {
    id: "evt-1",
    title: "Annual Alumni Meet 2025",
    date: "2025-03-15T09:00:00",
    location: "Main Campus Auditorium",
    type: "networking",
    attendees: 156,
    description: "Join us for the Annual Alumni Meet 2025 to reconnect with your classmates and build your professional network. This event includes keynote speeches from distinguished alumni, panel discussions, and networking opportunities.",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    registrationOpen: true
  },
  {
    id: "evt-2",
    title: "Career Fair Spring 2025",
    date: "2025-04-10T10:00:00",
    location: "Engineering Block",
    type: "career",
    attendees: 89,
    description: "Connect with top employers from various industries looking to hire talented graduates and alumni. Bring your resume and be prepared for on-the-spot interviews with leading companies in technology, finance, and engineering sectors.",
    image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg",
    registrationOpen: true
  },
  {
    id: "evt-3",
    title: "Technical Workshop: AI & Machine Learning",
    date: "2025-02-28T14:00:00",
    location: "Computer Science Department",
    type: "workshop",
    attendees: 42,
    description: "Learn about the latest advancements in AI and machine learning from industry experts and academic leaders. This hands-on workshop will cover practical applications, coding examples, and future trends in artificial intelligence.",
    image: "https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg",
    registrationOpen: true
  },
  {
    id: "evt-4",
    title: "Entrepreneurship Summit",
    date: "2025-05-20T11:00:00",
    location: "Business School Conference Hall",
    type: "conference",
    attendees: 112,
    description: "A day-long summit featuring successful entrepreneurs, investors, and startup mentors to guide aspiring business leaders. Learn about fundraising, business model development, and scaling strategies from those who've been there and done it.",
    image: "https://images.pexels.com/photos/6476783/pexels-photo-6476783.jpeg",
    registrationOpen: true
  },
  {
    id: "evt-5",
    title: "Alumni Sports Tournament",
    date: "2025-07-05T08:00:00",
    location: "University Sports Complex",
    type: "sports",
    attendees: 78,
    description: "Join fellow alumni for a day of friendly competition in cricket, football, basketball, and more. Form teams with your batch mates or join mixed teams to network while enjoying your favorite sports.",
    image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
    registrationOpen: false
  },
  {
    id: "evt-6",
    title: "Cultural Evening: Alumni Edition",
    date: "2025-08-15T18:00:00",
    location: "University Amphitheatre",
    type: "cultural",
    attendees: 95,
    description: "A night of music, dance, and nostalgia featuring performances by talented alumni. Relive your college days through cultural performances and enjoy a gala dinner with your former classmates and professors.",
    image: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg",
    registrationOpen: false
  },
  {
    id: "evt-7",
    title: "Freshman Orientation & Alumni Mentorship",
    date: "2025-08-01T10:00:00",
    location: "Main Hall",
    type: "mentorship",
    attendees: 64,
    description: "Help welcome the new batch of students and share your experiences and advice. This is a great opportunity to give back to your alma mater by mentoring freshmen and helping them navigate their academic journey.",
    image: "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg",
    registrationOpen: false
  },
  {
    id: "evt-8",
    title: "Industry-Academia Collaborative Research Symposium",
    date: "2025-09-20T09:00:00",
    location: "Research Center",
    type: "academic",
    attendees: 37,
    description: "A platform for researchers, professors, and industry professionals to present their work and explore collaborative opportunities. This symposium aims to bridge the gap between academic research and industry applications.",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    registrationOpen: false
  },
  {
    id: "evt-9",
    title: "Global Alumni Chapter Meet",
    date: "2025-10-10T19:00:00",
    location: "Virtual Event",
    type: "networking",
    attendees: 215,
    description: "Connect with alumni across the globe in this virtual networking event. Representatives from various international chapters will share updates and opportunities for alumni living abroad or interested in global careers.",
    image: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg",
    registrationOpen: false
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter events based on search term and event type
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = eventTypeFilter === "all" || event.type === eventTypeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Extract unique event types for filter dropdown
  const eventTypes = ["all", ...new Set(eventsData.map(event => event.type))];
  
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
      case 'sports': return 'default';
      case 'cultural': return 'secondary';
      case 'mentorship': return 'outline';
      case 'academic': return 'destructive';
      default: return 'default';
    }
  };
  
  const handleEventDetails = (event: typeof eventsData[0]) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-muted-foreground">
          Discover upcoming events, workshops, and gatherings for students and alumni.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden flex flex-col h-full">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.image})` }}
              />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                  <Badge variant={getBadgeVariant(event.type)} className="capitalize">
                    {event.type}
                  </Badge>
                </div>
                <CardDescription>
                  {formatDate(event.date)} at {formatTime(event.date)}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {event.description}
                </p>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 space-x-2">
                <Button variant="outline" onClick={() => handleEventDetails(event)} className="flex-grow">
                  Details
                </Button>
                <Button 
                  disabled={!event.registrationOpen} 
                  className="flex-grow"
                >
                  {event.registrationOpen ? "Register" : "Coming Soon"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
      
      {/* Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="mb-4">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-md" 
                />
              </div>
              <div className="flex items-center justify-between">
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <Badge variant={getBadgeVariant(selectedEvent.type)} className="capitalize">
                  {selectedEvent.type}
                </Badge>
              </div>
              <DialogDescription>
                {formatDate(selectedEvent.date)} at {formatTime(selectedEvent.date)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <p>{selectedEvent.description}</p>
              
              <div className="bg-muted p-4 rounded-md space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{formatTime(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{selectedEvent.attendees} people attending</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                onClick={() => setIsDialogOpen(false)} 
                variant="outline"
              >
                Close
              </Button>
              <Button disabled={!selectedEvent.registrationOpen}>
                {selectedEvent.registrationOpen ? "Register Now" : "Coming Soon"}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}