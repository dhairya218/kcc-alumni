"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserRound, 
  Mail, 
  Phone, 
  MapPin, 
  Pencil, 
  Shield, 
  GraduationCap,
  BookOpen,
  Calendar,
  Building,
  Briefcase
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileEditModal from "@/components/profile/ProfileEditModal";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return <ProfileSkeleton />;
  }
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  // Mock user profile data (would come from API)
  const profileData = {
    ...user,
    rollNumber: "KP2023045",
    dob: "1998-05-15",
    city: "Mumbai",
    phoneNumber: "9876543210",
    gender: "Male",
    courses: [
      { name: "B.Tech Computer Science", year: "2020-2024" }
    ],
    address: "123 College Road, Mumbai, Maharashtra, 400001",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/username",
      github: "https://github.com/username",
      twitter: "https://twitter.com/username"
    },
    education: [
      {
        institution: "Khodiyar Institute of Technology",
        degree: "B.Tech in Computer Science",
        year: "2020-2024",
        grade: "8.5 CGPA"
      },
      {
        institution: "New Delhi Public School",
        degree: "High School",
        year: "2018-2020",
        grade: "92%"
      }
    ],
    workExperience: user.role === "alumni" ? [
      {
        company: "Tech Innovations Inc.",
        role: "Software Engineer",
        duration: "2024-Present",
        description: "Working on building scalable web applications using React and Node.js."
      },
      {
        company: "StartupXYZ",
        role: "Intern",
        duration: "2023",
        description: "Developed and maintained company website and internal tools."
      }
    ] : [],
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button onClick={() => setIsEditModalOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage 
                src={profileData.profilePicture || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"} 
                alt={profileData.firstName}
              />
              <AvatarFallback className="text-3xl">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
            <p className="text-muted-foreground capitalize">{profileData.role}</p>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm break-all">{profileData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{profileData.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{profileData.city}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-sm">{profileData.rollNumber}</span>
              </div>
            </div>
            
            <div className="w-full border-t border-border mt-6 pt-6">
              <h3 className="font-medium mb-3">Social Profiles</h3>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href={profileData.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={profileData.socialProfiles.github} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={profileData.socialProfiles.twitter} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                    </svg>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserRound className="mr-2 h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Your basic personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{profileData.firstName} {profileData.lastName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{new Date(profileData.dob).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{profileData.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{profileData.phoneNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium capitalize">{profileData.role}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Roll Number</p>
                      <p className="font-medium">{profileData.rollNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">{profileData.city}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{profileData.address}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Education Details
                  </CardTitle>
                  <CardDescription>
                    Your educational background and qualifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div 
                      key={index} 
                      className={`${index !== 0 ? 'border-t pt-4' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Grade: {edu.grade}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Course Details */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Course Details</h3>
                    {profileData.courses.map((course, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{course.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{course.year}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    Professional Experience
                  </CardTitle>
                  <CardDescription>
                    Your work experience and professional background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profileData.workExperience.length > 0 ? (
                    <div className="space-y-6">
                      {profileData.workExperience.map((exp, index) => (
                        <div 
                          key={index} 
                          className={`${index !== 0 ? 'border-t pt-4' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{exp.role}</h3>
                            <span className="text-sm text-muted-foreground">{exp.duration}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{exp.company}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        {user.role === "student" 
                          ? "You haven't added any work experience yet. Update your profile to add your internships and work experience."
                          : "No work experience added yet. Update your profile to add your professional background."}
                      </p>
                      <Button 
                        onClick={() => setIsEditModalOpen(true)} 
                        variant="outline" 
                        className="mt-4"
                      >
                        Add Experience
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      <ProfileEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
      />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[500px] w-full" />
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  );
}