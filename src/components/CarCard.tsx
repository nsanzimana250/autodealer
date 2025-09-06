import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: 'new' | 'used';
  featured?: boolean;
  viewMode?: 'grid' | 'list';
  className?: string;
  isLiked: boolean;
  onLikeToggle: () => void;
}

const CarCard = ({ 
  id, 
  name, 
  brand, 
  price, 
  image, 
  year, 
  mileage, 
  fuelType, 
  transmission, 
  condition, 
  featured = false,
  viewMode = 'grid',
  className,
  isLiked,
  onLikeToggle,
}: CarCardProps) => {
  const isList = viewMode === 'list';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log(`Added ${name} to cart`);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle();
  };

  return (
    <div className={cn("card-automotive group overflow-hidden relative", className)}>
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-accent text-accent-foreground font-semibold">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/80 hover:bg-white text-foreground"
          onClick={handleToggleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>

      <Link to={`/cars/${id}`} className={cn("block", isList && "flex")}>
        <div className={cn(
          "overflow-hidden",
          isList ? "w-1/3 flex-shrink-0" : "aspect-[4/3]"
        )}>
          <img
            src={image}
            alt={`${brand} ${name}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className={cn("space-y-4", isList ? "p-4 flex-1" : "p-6")}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant={condition === 'new' ? 'default' : 'secondary'}>
                {condition === 'new' ? 'New' : 'Used'}
              </Badge>
              <span className="text-sm text-muted-foreground">{year}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {brand} {name}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>Mileage: {mileage.toLocaleString()} mi</div>
            <div>Fuel: {fuelType}</div>
            <div>Transmission: {transmission}</div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-accent">
              ${price.toLocaleString()}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" className="btn-primary" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
