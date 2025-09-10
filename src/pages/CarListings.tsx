import { useState, useMemo, useRef, useEffect } from 'react';
import { Grid, List, Search, Sparkles, RotateCcw, Filter, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CarCard from '@/components/CarCard';
import { carsData } from '@/data/cars';
import { motion, AnimatePresence } from 'framer-motion';

const MotionButton = motion(Button);

const CarListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Get unique brands for filtering
  const brands = useMemo(() => {
    return Array.from(new Set(carsData.map(car => car.brand)));
  }, []);

  const filteredCars = useMemo(() => {
    let filtered = carsData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      return matchesSearch && matchesBrand && matchesPrice;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-asc':
        filtered.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, selectedBrands, priceRange]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setPriceRange([0, 100000]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  // Simulate loading for a better UX
  useEffect(() => {
    if (searchTerm || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 100000) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedBrands, priceRange]);

  // Parallax effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        headerRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Parallax */}
      <div 
        ref={headerRef}
        className="bg-gradient-to-r from-primary via-primary/90 to-primary-glow text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Discover Your Dream Car
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Explore our premium collection of vehicles tailored to your preferences
          </p>
          
          {/* Quick Stats with animation */}
          <motion.div 
            className="flex flex-wrap gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl font-bold">{carsData.length}+</div>
              <div className="text-sm">Vehicles Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Customer Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex-1 max-w-md">
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.01 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars, brands, models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/30"
              />
              {searchTerm && (
                <motion.button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </motion.button>
              )}
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {/* View Toggle */}
            <div className="flex border border-border rounded-md p-1 bg-muted/50">
              <MotionButton
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid className="h-4 w-4" />
              </MotionButton>
              <MotionButton
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="h-4 w-4" />
              </MotionButton>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 transition-all duration-300 hover:border-primary/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="year-desc">Year: Newest First</SelectItem>
                <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-lg font-semibold mb-4">Refine Your Search</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Brands</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <motion.button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                            selectedBrands.includes(brand)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border hover:border-primary/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {brand}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground">
            Showing {filteredCars.length} of {carsData.length} vehicles
            {searchTerm && (
              <span> for "<strong>{searchTerm}</strong>"</span>
            )}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <motion.div 
              className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Cars Grid/List */}
        {!loading && (
          <>
            {filteredCars.length > 0 ? (
              <motion.div 
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6" 
                  : "space-y-6"
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <CarCard 
                      {...car} 
                      viewMode={viewMode}
                      className={viewMode === 'list' ? 'flex-row h-64' : ''}
                      isLiked={false}
                      onLikeToggle={() => {}}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-muted mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-10 w-10 text-muted-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">No cars match your search</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search terms to find your perfect vehicle
                </p>
                <Button onClick={clearSearch} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* Load More (for pagination) */}
        {filteredCars.length > 0 && filteredCars.length >= 9 && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MotionButton 
              variant="outline" 
              className="px-8 transition-all duration-300 hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Cars
            </MotionButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarListings;
