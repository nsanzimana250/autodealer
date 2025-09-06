import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Star, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CarCard from '@/components/CarCard';
import { carsData, categories, brands } from '@/data/cars';
import heroImage from '@/assets/hero-car.jpg';

const Home = () => {
  console.log('Home component rendering');
  console.log('heroImage:', heroImage);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const featuredCars = carsData.filter(car => car.featured).slice(0, 3);
  console.log('featuredCars:', featuredCars);

  const stats = [
    { icon: Star, label: 'Customer Rating', value: '4.9/5' },
    { icon: Shield, label: 'Years of Trust', value: '25+' },
    { icon: Award, label: 'Cars Sold', value: '50K+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero Car" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Your
            <span className="block text-accent">Perfect Car</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in">
            Discover premium vehicles from trusted dealers. New, used, electric - we have it all.
          </p>
          
          {/* Search Form */}
          <div className="glass-effect p-6 max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="btn-hero">
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="bg-gradient-to-r from-accent to-accent-glow p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Cars</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium vehicles that offer exceptional value and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/cars">
              <Button className="btn-primary text-lg px-8 py-4">
                View All Cars
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose AutoDealer?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience the difference with our premium service and extensive selection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">Certified Quality</h3>
              <p className="text-white/80">Every vehicle undergoes thorough inspection and certification</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Star className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-white/80">Competitive pricing with transparent, no-hidden-fee policy</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-white/10 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">Expert Service</h3>
              <p className="text-white/80">Professional team with 25+ years of automotive expertise</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;