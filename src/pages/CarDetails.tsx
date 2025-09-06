import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, Phone, Mail, MapPin, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { carsData } from '@/data/cars';

const CarDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const car = carsData.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Link to="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`Added ${car.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/cars" 
            className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={car.images[selectedImage] || car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.brand} ${car.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant={car.condition === 'new' ? 'default' : 'secondary'}>
                    {car.condition === 'new' ? 'New' : 'Used'}
                  </Badge>
                  <span className="text-muted-foreground">{car.year}</span>
                  {car.featured && (
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {car.brand} {car.name}
              </h1>
              <div className="text-3xl font-bold text-accent mb-4">
                ${car.price.toLocaleString()}
              </div>
            </div>

            <Separator />

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{car.mileage.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Miles</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{car.specs.mpg}</div>
                <div className="text-sm text-muted-foreground">MPG</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{car.fuelType}</div>
                <div className="text-sm text-muted-foreground">Fuel Type</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{car.transmission}</div>
                <div className="text-sm text-muted-foreground">Transmission</div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full btn-primary" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Dealer
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </div>
          </div>
        </div>

        {/* Detailed Specs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Specifications */}
          <div className="card-automotive p-6">
            <h3 className="text-xl font-semibold mb-6">Specifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Engine</span>
                <span className="font-medium">{car.specs.engine}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Horsepower</span>
                <span className="font-medium">{car.specs.horsepower} HP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Drivetrain</span>
                <span className="font-medium">{car.specs.drivetrain}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Seating</span>
                <span className="font-medium">{car.specs.seats} seats</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Exterior Color</span>
                <span className="font-medium">{car.specs.color}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="card-automotive p-6">
            <h3 className="text-xl font-semibold mb-6">Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 card-automotive p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Interested in this car?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our sales team for more information, schedule a test drive, or get financing options.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-accent" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>sales@autodealer.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>123 Auto Street, Car City</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;