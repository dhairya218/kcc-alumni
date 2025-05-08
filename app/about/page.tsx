import { GraduationCap, Users, Target, History, Award, HandHeart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              About Khodiyar Alumni Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Building bridges between past, present, and future generations of Khodiyar Institute.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-lg border">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                We are dedicated to fostering lasting connections between alumni and their alma mater, 
                creating opportunities for networking, professional growth, and enabling meaningful 
                contributions back to the institution that shaped their careers.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-lg border">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground">
                To build the strongest and most engaged alumni network that serves as a valuable 
                resource for both graduates and current students, contributing to the continued 
                success and prestige of Khodiyar Institute.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers various ways for alumni to stay connected and give back to their alma mater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <History className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold">Our History</h2>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-lg border space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Established in 1990, Khodiyar Institute has a rich history of academic excellence 
                and innovation. The Alumni Association was formally established in 2000 to maintain 
                the connection between the institution and its graduates.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, we've grown from a small group of dedicated alumni to a global network 
                spanning across industries and continents. Today, our alumni portal serves thousands of 
                graduates who continue to represent and support their alma mater.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">30+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">5000+</div>
                  <div className="text-sm text-muted-foreground">Alumni Worldwide</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Annual Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HandHeart className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a recent graduate or from the pioneering batches, the Khodiyar Alumni 
              Portal is your platform to reconnect, network, and grow. Join us in building a 
              stronger community that benefits all members and contributes to the legacy of 
              our institution.
            </p>
            <div className="inline-flex gap-4">
              <a 
                href="/register" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Join Now
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Connect Alumni",
    description: "We bring together graduates from all batches to build a strong, supportive community through networking events and online platforms."
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    title: "Support Growth",
    description: "Through mentorship programs, job boards, and professional resources, we help alumni advance in their careers and achieve their goals."
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Organize Events",
    description: "From reunions to professional networking sessions, we create opportunities for meaningful connections and knowledge sharing."
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Share Success",
    description: "We celebrate and highlight the achievements of our distinguished alumni, inspiring the next generation of professionals."
  },
  {
    icon: <HandHeart className="h-6 w-6 text-primary" />,
    title: "Give Back",
    description: "We provide platforms for alumni to contribute to scholarships, infrastructure development, and other meaningful initiatives."
  },
  {
    icon: <History className="h-6 w-6 text-primary" />,
    title: "Preserve Legacy",
    description: "We maintain and celebrate our institution's rich history while building towards an even brighter future for coming generations."
  }
];