import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import CarCard from '@/components/CarCard';
import { carsData, categories, brands } from '@/data/cars';

const CarListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let filtered = carsData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      const matchesCondition = selectedCondition === 'All' || car.condition === selectedCondition;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice;
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
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, selectedCondition, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setPriceRange([0, 100000]);
    setSortBy('price-asc');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Our Cars</h1>
          <p className="text-xl text-white/90">Find your perfect vehicle from our extensive collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card-automotive p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={0}
                    step={5000}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredCars.length} cars found
                  </span>
                  {(selectedCategory !== 'All' || selectedBrand !== 'All' || selectedCondition !== 'All') && (
                    <div className="flex gap-2">
                      {selectedCategory !== 'All' && (
                        <Badge variant="secondary">{selectedCategory}</Badge>
                      )}
                      {selectedBrand !== 'All' && (
                        <Badge variant="secondary">{selectedBrand}</Badge>
                      )}
                      {selectedCondition !== 'All' && (
                        <Badge variant="secondary">{selectedCondition}</Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="year-desc">Year: Newest First</SelectItem>
                    <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListings;