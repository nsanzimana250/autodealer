import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronRight, Star, Shield, Award, 
  Clock, TrendingUp, Users, MapPin, Phone, MessageCircle,
  Calendar, CheckCircle, ArrowRight, Play, Pause, Car,
  X, Heart, Share2, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarCard from '@/components/CarCard';
import { carsData, categories, brands } from '@/data/cars';
import { servicesData } from '@/data/services';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const testimonialInterval = useRef<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const featuredCars = carsData.filter(car => car.featured).slice(0, 6);
  const newArrivals = carsData.filter(car => car.condition === 'new').slice(0, 3);
  const electricCars = carsData.filter(car => car.category === 'Electric').slice(0, 3);

  const stats = [
    { icon: Star, label: 'Customer Rating', value: '4.9/5' },
    { icon: Shield, label: 'Years of Trust', value: '25+' },
    { icon: Award, label: 'Cars Sold', value: '50K+' },
    { icon: Users, label: 'Happy Clients', value: '30K+' }
  ];

  // Use services data from services.ts
  const displayServices = servicesData.slice(0, 4); // Show first 4 services

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'AutoDealer made buying my dream car so effortless. Their team was professional and helped me find the perfect vehicle within my budget.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content: 'The entire process was transparent and hassle-free. I got a great deal on my new electric car and the after-sales service has been exceptional.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Teacher',
      content: 'As a first-time car buyer, I was nervous about the process. The team at AutoDealer guided me through every step and found me the perfect car.',
      rating: 5
    }
  ];

  const brandsList = [
    'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 
    'Tesla', 'Hyundai', 'Nissan', 'Volkswagen', 'Chevrolet', 'Lexus'
  ];

  // Handle scroll events for navbar and animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPlaying) {
      testimonialInterval.current = window.setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (testimonialInterval.current) {
        window.clearInterval(testimonialInterval.current);
        testimonialInterval.current = null;
      }
    };
  }, [isPlaying, testimonials.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTestimonial = (index: number) => {
    setActiveTestimonial(index);
    setIsPlaying(false);
    if (testimonialInterval.current) {
      window.clearInterval(testimonialInterval.current);
      testimonialInterval.current = null;
    }
  };

  const toggleLike = (id: string) => {
    setLikedCars(prev => 
      prev.includes(id) 
        ? prev.filter(carId => carId !== id) 
        : [...prev, id]
    );
  };

  // Generate initials for testimonial avatars
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Generate gradient based on index for consistent colors
  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-amber-500 to-orange-600'
    ];
    return gradients[index % gradients.length];
  };

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="hero-section relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-primary/80 to-primary-glow/80"></div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Find Your
            <span className="block text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
              Perfect Car
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Discover premium vehicles from trusted dealers. New, used, electric - we have it all.
          </motion.p>
          
          {/* Search Form */}
          <motion.div 
            className="glass-effect p-6 max-w-4xl mx-auto rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl pl-10 pr-4"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-white/70 hover:text-white" />
                  </button>
                )}
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="btn-hero rounded-xl text-lg transition-all duration-300 hover:shadow-lg">
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Cars</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium vehicles that offer exceptional value and performance
            </p>
          </motion.div>
          
          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="mb-8 bg-muted p-1 rounded-xl">
              <TabsTrigger value="featured" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                Featured
              </TabsTrigger>
              <TabsTrigger value="new" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                New Arrivals
              </TabsTrigger>
              <TabsTrigger value="electric" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                Electric Vehicles
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredCard(car.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative"
                  >
                    <CarCard 
                      {...car} 
                      isLiked={likedCars.includes(car.id)}
                      onLikeToggle={() => toggleLike(car.id)}
                    />
                    <AnimatePresence>
                      {hoveredCard === car.id && (
                        <motion.div 
                          className="absolute top-4 right-4 flex gap-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            size="icon" 
                            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                            onClick={() => toggleLike(car.id)}
                          >
                            <Heart 
                              className={`h-5 w-5 ${likedCars.includes(car.id) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                          </Button>
                          <Button 
                            size="icon" 
                            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                          <Button 
                            size="icon" 
                            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newArrivals.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CarCard 
                      {...car} 
                      isLiked={likedCars.includes(car.id)}
                      onLikeToggle={() => toggleLike(car.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="electric">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {electricCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CarCard 
                      {...car} 
                      isLiked={likedCars.includes(car.id)}
                      onLikeToggle={() => toggleLike(car.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/cars">
              <Button className="btn-primary text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg">
                View All Cars
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive automotive solutions to meet all your needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/services/${service.id}`} className="block">
                  <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center">
                      <motion.div 
                        className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <service.icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                      <Button variant="link" className="text-primary gap-1 group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-start mb-6">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full mr-6 bg-gradient-to-r ${getGradient(activeTestimonial)}`}>
                    <span className="text-white font-bold text-xl">
                      {getInitials(testimonials[activeTestimonial].name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{testimonials[activeTestimonial].name}</h3>
                    <p className="text-white/70">{testimonials[activeTestimonial].role}</p>
                    <div className="flex mt-2">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-lg italic">"{testimonials[activeTestimonial].content}"</p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-white scale-125' : 'bg-white/30'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={togglePlay}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? 'Pause testimonials' : 'Play testimonials'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Top Brands</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We partner with the world's leading automotive brands
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {brandsList.map((brand, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center p-4 bg-muted rounded-xl hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl font-semibold text-muted-foreground">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to Find Your Dream Car?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Visit our showroom today or schedule a virtual consultation with our experts
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Button className="btn-primary text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Visit Our Showroom</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our premium vehicles in person
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">AutoDealer Premium</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">123 Automotive Avenue, Car City, CC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-muted-foreground">Mon-Fri: 9AM - 8PM</p>
                      <p className="text-muted-foreground">Sat-Sun: 10AM - 6PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">info@autodealer.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="h-96 bg-muted rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary-glow/20 relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center text-muted-foreground z-10">
                <MapPin className="h-16 w-16 mx-auto text-primary mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">Map would be displayed here</p>
              </div>
              <div className="absolute inset-0 bg-grid-primary/10 bg-[size:40px_40px]"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
