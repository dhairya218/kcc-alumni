"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardWelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingEventsCard from "@/components/dashboard/UpcomingEventsCard";
import ConnectionsCard from "@/components/dashboard/ConnectionsCard";
import AnnouncementsCard from "@/components/dashboard/AnnouncementsCard";
import { CalendarCheck, Users, BadgeCheck, GraduationCap, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.firstName}!</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" asChild>
            <a href="/events">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Events
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/profile">
              <BadgeCheck className="mr-2 h-4 w-4" />
              Profile
            </a>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="connections">Network</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <DashboardWelcomeCard user={user} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Network
                </CardTitle>
                <CardDescription>Your professional connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New this month</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Your next scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registered</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This week</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This month</span>
                    <span className="font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  {user.role === "student" ? (
                    <>
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      Academic
                    </>
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                      Alumni Status
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {user.role === "student" ? "Your current academic progress" : "Your alumni engagement"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.role === "student" ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Semester</span>
                        <span className="font-medium">5th</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CGPA</span>
                        <span className="font-medium">8.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Credits Completed</span>
                        <span className="font-medium">98/180</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member Since</span>
                        <span className="font-medium">2021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contributions</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mentees</span>
                        <span className="font-medium">3</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingEventsCard />
            <AnnouncementsCard />
          </div>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <UpcomingEventsCard expanded />
        </TabsContent>
        
        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6">
          <ConnectionsCard />
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Documents</CardTitle>
              <CardDescription>
                Access important resources and documents related to your academic journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Academic Calendar</span>
                    <span className="text-xs text-muted-foreground">2023-2024 Academic Year</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Course Catalog</span>
                    <span className="text-xs text-muted-foreground">All available courses</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Career Resources</span>
                    <span className="text-xs text-muted-foreground">Resume templates, interview tips</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Alumni Directory</span>
                    <span className="text-xs text-muted-foreground">Connect with graduates</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Scholarship Information</span>
                    <span className="text-xs text-muted-foreground">Financial aid opportunities</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Campus Map</span>
                    <span className="text-xs text-muted-foreground">Navigate the campus</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-10 w-full md:w-96" />
        <Skeleton className="h-40 w-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  );
}