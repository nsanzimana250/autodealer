import { Users, Award, Shield, Star, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      experience: '25+ years',
      description: 'Automotive industry veteran with a passion for customer service'
    },
    {
      name: 'Sarah Johnson',
      role: 'Sales Manager',
      experience: '15+ years',
      description: 'Expert in matching customers with their perfect vehicle'
    },
    {
      name: 'Mike Wilson',
      role: 'Service Director',
      experience: '20+ years',
      description: 'Certified technician ensuring every car meets our standards'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes comprehensive inspection and certification'
    },
    {
      icon: Star,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority in every interaction'
    },
    {
      icon: Award,
      title: 'Trusted Experience',
      description: '25+ years of serving customers with integrity and expertise'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-glow text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About AutoDealer</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              For over 25 years, we've been helping families find their perfect vehicle. 
              From first-time buyers to luxury car enthusiasts, we're here to serve you.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1999, AutoDealer started as a small family business with a simple mission: 
                  to provide honest, transparent car buying experience in a friendly environment.
                </p>
                <p>
                  What began as a modest lot with 20 vehicles has grown into one of the region's 
                  most trusted dealerships, featuring over 500 carefully selected cars, trucks, and SUVs.
                </p>
                <p>
                  Today, we're proud to have served over 50,000 customers, maintaining our commitment 
                  to quality, integrity, and exceptional customer service that started it all.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card-automotive p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">50K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="card-automotive p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">25+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="card-automotive p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-muted-foreground">Cars Available</div>
              </div>
              <div className="card-automotive p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">4.9/5</div>
                <div className="text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-automotive p-8 text-center">
                <div className="bg-gradient-to-r from-accent to-accent-glow p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to helping you find your perfect car
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-automotive p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-glow rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <div className="text-accent font-medium mb-2">{member.role}</div>
                <div className="text-sm text-muted-foreground mb-3">{member.experience}</div>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Visit our showroom, browse our inventory online, or give us a call. 
            We're here to help you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>123 Auto Street, Car City, CC 12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>info@autodealer.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Visit Our Showroom
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Browse Inventory
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;