"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Info } from "lucide-react";

// Mock data for announcements
const announcements = [
  {
    id: "ann-1",
    title: "Scholarship Applications Now Open",
    date: "2025-01-15",
    type: "important",
    message: "Applications for the 2025-2026 academic year scholarships are now open. Apply before February 28, 2025.",
  },
  {
    id: "ann-2",
    title: "Campus Reopening Update",
    date: "2025-01-10",
    type: "general",
    message: "The campus will fully reopen for in-person classes starting March 1, 2025. Safety protocols will remain in place.",
  },
  {
    id: "ann-3",
    title: "New Industry Partnership",
    date: "2025-01-05",
    type: "news",
    message: "We're excited to announce our new partnership with Tech Innovations Inc. for internship and placement opportunities.",
  },
  {
    id: "ann-4",
    title: "Alumni Donation Drive",
    date: "2024-12-20",
    type: "important",
    message: "Join our annual donation drive to support underprivileged students. Your contributions can make a difference.",
  },
];

export default function AnnouncementsCard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'important': return 'destructive';
      case 'news': return 'secondary';
      case 'general': return 'default';
      default: return 'default';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Announcements</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
        </div>
        <CardDescription>Latest updates and announcements</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="p-4 rounded-lg bg-muted/40 hover:bg-muted transition-colors space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{announcement.title}</h3>
                <Badge variant={getBadgeVariant(announcement.type)} className="capitalize">
                  {announcement.type}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {announcement.message}
              </p>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  {formatDate(announcement.date)}
                </span>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Details</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}