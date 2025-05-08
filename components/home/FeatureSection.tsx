"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Award, Search, GraduationCap } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Events",
    description: "Stay updated with campus events, reunions, and alumni gatherings happening around the world.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Network",
    description: "Connect with fellow alumni across different batches, industries, and locations.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Resources",
    description: "Access exclusive resources, research papers, and career development materials.",
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Directory",
    description: "Find and connect with alumni working in your industry or living in your area.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Recognition",
    description: "Highlight your achievements and get recognized in the alumni community.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Mentorship",
    description: "Mentor current students or get mentored by experienced alumni in your field.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join Our Alumni Network?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our alumni portal offers a range of features designed to help you stay connected,
            grow professionally, and give back to your alma mater.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}