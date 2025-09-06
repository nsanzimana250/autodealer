import { useState, useEffect, useRef } from 'react';
import { Users, Award, Shield, Star, MapPin, Phone, Mail, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [isPlaying, setIsPlaying] = useState(true);
  const [counterValues, setCounterValues] = useState({
    customers: 0,
    years: 0,
    cars: 0,
    rating: 0
  });
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      experience: '25+ years',
      description: 'Automotive industry veteran with a passion for customer service',
      specialties: ['Leadership', 'Strategy', 'Customer Relations']
    },
    {
      name: 'Sarah Johnson',
      role: 'Sales Manager',
      experience: '15+ years',
      description: 'Expert in matching customers with their perfect vehicle',
      specialties: ['Sales', 'Negotiation', 'Customer Experience']
    },
    {
      name: 'Mike Wilson',
      role: 'Service Director',
      experience: '20+ years',
      description: 'Certified technician ensuring every car meets our standards',
      specialties: ['Technical Expertise', 'Quality Control', 'Team Management']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes comprehensive inspection and certification',
      details: 'Our 150-point inspection process ensures every vehicle meets our rigorous standards before it reaches our lot.'
    },
    {
      icon: Star,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority in every interaction',
      details: 'We offer a 30-day warranty on all vehicles and a 7-day money-back guarantee for your peace of mind.'
    },
    {
      icon: Award,
      title: 'Trusted Experience',
      description: '25+ years of serving customers with integrity and expertise',
      details: 'Generations of families have trusted us with their automotive needs, and we continue that tradition today.'
    }
  ];

  const milestones = [
    { year: '1999', event: 'Founded as a small family business' },
    { year: '2005', event: 'Expanded to second location' },
    { year: '2012', event: 'Launched online inventory system' },
    { year: '2018', event: 'Reached 30,000 customers served' },
    { year: '2023', event: 'Celebrated 25 years in business' }
  ];

  // Counter animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 100;
    const incrementValues = {
      customers: 50000 / steps,
      years: 25 / steps,
      cars: 500 / steps,
      rating: 4.9 / steps
    };

    let currentValues = { customers: 0, years: 0, cars: 0, rating: 0 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentValues = {
        customers: Math.min(Math.round(currentValues.customers + incrementValues.customers), 50000),
        years: Math.min(currentValues.years + incrementValues.years, 25),
        cars: Math.min(Math.round(currentValues.cars + incrementValues.cars), 500),
        rating: Math.min(+(currentValues.rating + incrementValues.rating).toFixed(1), 4.9)
      };

      setCounterValues(currentValues);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observers = [];

    const createObserver = (ref, animationClass) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      observers.push(observer);
    };

    createObserver(teamRef, 'animate-fade-in-up');
    createObserver(valuesRef, 'animate-fade-in-up');

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            About <span className="text-accent">AutoDealer</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto animate-fade-in-up">
            For over 25 years, we've been helping families find their perfect vehicle. 
            From first-time buyers to luxury car enthusiasts, we're here to serve you.
          </p>
        </div>
      </section>

      {/* Timeline & Story Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-muted p-1 rounded-xl">
              <TabsTrigger value="story" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                Our Story
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                Timeline
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="story" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-foreground">Our Journey</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      Founded in 1999, AutoDealer started as a small family business with a simple mission: 
                      to provide honest, transparent car buying experience in a friendly environment.
                    </p>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      What began as a modest lot with 20 vehicles has grown into one of the region's 
                      most trusted dealerships, featuring over 500 carefully selected cars, trucks, and SUVs.
                    </p>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      Today, we're proud to have served over 50,000 customers, maintaining our commitment 
                      to quality, integrity, and exceptional customer service that started it all.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6" ref={statsRef}>
                  <div className="card-automotive p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-accent mb-2">{counterValues.customers.toLocaleString()}+</div>
                    <div className="text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="card-automotive p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-accent mb-2">{counterValues.years}+</div>
                    <div className="text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="card-automotive p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-accent mb-2">{counterValues.cars}+</div>
                    <div className="text-muted-foreground">Cars Available</div>
                  </div>
                  <div className="card-automotive p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-accent mb-2">{counterValues.rating}/5</div>
                    <div className="text-muted-foreground">Customer Rating</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="animate-fade-in">
              <div className="relative">
                {/* Vertical Timeline */}
                <div className="border-l-2 border-primary/30 ml-4 pl-8 space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative animate-fade-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="absolute -left-11 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-2xl">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <p className="text-muted-foreground">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Values - Interactive Cards */}
      <section className="py-20 bg-muted/30" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-accent to-accent-glow p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{value.description}</p>
                    <div className="text-sm text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {value.details}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team - Interactive Profiles */}
      <section className="py-20" ref={teamRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to helping you find your perfect car
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group relative">
                <div className="card-automotive p-6 text-center transition-all duration-500 group-hover:bg-primary/5 group-hover:scale-105">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-glow rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-accent group-hover:to-accent-glow transition-all duration-500">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-accent font-medium mb-2">{member.role}</div>
                  <div className="text-sm text-muted-foreground mb-3">{member.experience}</div>
                  <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                  
                  {/* Specialties on hover */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                    <div className="text-xs font-medium text-primary mb-2">Specialties:</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA with Interactive Map */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-pulse">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Visit our showroom, browse our inventory online, or give us a call. 
            We're here to help you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 flex-wrap">
            <div className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
              <MapPin className="h-5 w-5" />
              <span>123 Auto Street, Car City, CC 12345</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-accent transition-colors cursor-pointer">
              <Mail className="h-5 w-5" />
              <span>info@autodealer.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              Visit Our Showroom
              <MapPin className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 rounded-xl border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-transform"
            >
              Browse Inventory
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Add these CSS animations to your global styles */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .card-automotive {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default About;
