"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "alumni";
  profilePicture?: string;
}

interface WelcomeCardProps {
  user: User;
}

export default function DashboardWelcomeCard({ user }: WelcomeCardProps) {
  // Calculate profile completion
  const profileCompletionScore = 85; // This would typically come from the API
  
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Welcome back, {user.firstName}!</CardTitle>
            <CardDescription>
              {user.role === "student" 
                ? "Here's an overview of your student dashboard" 
                : "Here's an overview of your alumni dashboard"}
            </CardDescription>
          </div>
          <Badge variant={user.role === "student" ? "default" : "secondary"} className="uppercase">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-muted-foreground">
              {profileCompletionScore}%
            </span>
          </div>
          <Progress value={profileCompletionScore} className="h-2" />
          
          <p className="text-sm text-muted-foreground mt-2">
            {profileCompletionScore < 100 
              ? "Complete your profile for better networking opportunities."
              : "Your profile is complete and optimized for networking!"}
              {' '}
            <Link href="/profile" className="text-primary hover:underline">
              Update Profile
            </Link>
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickAccessLinks.map((link, index) => (
            <Card key={index} className="bg-muted/50 hover:bg-muted transition-colors">
              <Link href={link.href}>
                <CardContent className="p-4 flex items-center space-x-2">
                  <div className="text-primary">{link.icon}</div>
                  <span className="text-sm font-medium">{link.label}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Quick access links with their icons
import { Calendar, Users, MessageSquare, BookOpen } from "lucide-react";

const quickAccessLinks = [
  {
    label: "Events",
    href: "/events",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: "Alumni Network",
    href: "/dashboard?tab=connections",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    label: "Resources",
    href: "/dashboard?tab=resources",
    icon: <BookOpen className="h-5 w-5" />,
  },
];