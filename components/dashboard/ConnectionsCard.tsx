"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for connections
const connectionsData = [
  {
    id: "user-1",
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    graduationYear: "2018",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    connection: "1st",
    course: "B.Tech CSE",
  },
  {
    id: "user-2",
    name: "Priya Patel",
    role: "Product Manager",
    company: "Microsoft",
    graduationYear: "2020",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    connection: "1st",
    course: "MBA",
  },
  {
    id: "user-3",
    name: "Amit Kumar",
    role: "Data Scientist",
    company: "Amazon",
    graduationYear: "2019",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    connection: "2nd",
    course: "M.Tech CSE",
  },
  {
    id: "user-4",
    name: "Sneha Reddy",
    role: "UX Designer",
    company: "Adobe",
    graduationYear: "2021",
    avatar: "https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg",
    connection: "1st",
    course: "B.Tech ECE",
  },
  {
    id: "user-5",
    name: "Vikram Singh",
    role: "Entrepreneur",
    company: "TechStart Solutions",
    graduationYear: "2017",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    connection: "2nd",
    course: "BBA",
  },
  {
    id: "user-6",
    name: "Aisha Khan",
    role: "Marketing Manager",
    company: "Unilever",
    graduationYear: "2020",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    connection: "3rd",
    course: "MBA",
  }
];

export default function ConnectionsCard() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredConnections = connectionsData.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getConnectionBadgeVariant = (connection: string) => {
    switch (connection) {
      case '1st': return 'default';
      case '2nd': return 'secondary';
      case '3rd': return 'outline';
      default: return 'default';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alumni Network</CardTitle>
        <CardDescription>Connect with alumni and build your professional network</CardDescription>
        
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, company or course..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <div key={connection.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={connection.avatar} alt={connection.name} />
                    <AvatarFallback>{connection.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{connection.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {connection.role} at {connection.company}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {connection.course}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Class of {connection.graduationYear}
                      </span>
                      <Badge 
                        variant={getConnectionBadgeVariant(connection.connection)} 
                        className="text-xs"
                      >
                        {connection.connection} connection
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No connections found. Try a different search term.</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">Find More Alumni</Button>
        <Button>Manage Connections</Button>
      </CardFooter>
    </Card>
  );
}