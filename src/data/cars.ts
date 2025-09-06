import sedan1 from '@/assets/sedan-1.jpg';
import suv1 from '@/assets/suv-1.jpg';
import sports1 from '@/assets/sports-1.jpg';

export interface Car {
  model: any;
  isNew: unknown;
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: 'new' | 'used';
  category: string;
  features: string[];
  description: string;
  specs: {
    engine: string;
    horsepower: number;
    mpg: string;
    seats: number;
    drivetrain: string;
    color: string;
  };
  featured?: boolean;
}

export const carsData: Car[] = [
  {
    id: '1',
    name: 'Camry',
    brand: 'Toyota',
    price: 28500,
    image: sedan1,
    images: [sedan1],
    year: 2024,
    mileage: 0,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'new',
    category: 'Sedan',
    featured: true,
    features: ['Backup Camera', 'Bluetooth', 'Apple CarPlay', 'Safety Sense 2.0'],
    description: 'The 2024 Toyota Camry combines reliability with modern style. Perfect for daily commuting and family trips.',
    specs: {
      engine: '2.5L 4-Cylinder',
      horsepower: 203,
      mpg: '28/39',
      seats: 5,
      drivetrain: 'FWD',
      color: 'Silver Metallic'
    }
  },
  {
    id: '2',
    name: 'RAV4',
    brand: 'Toyota',
    price: 35200,
    image: suv1,
    images: [suv1],
    year: 2024,
    mileage: 0,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'new',
    category: 'SUV',
    featured: true,
    features: ['All-Wheel Drive', 'Roof Rails', 'LED Headlights', 'Smart Key'],
    description: 'Adventure-ready SUV with excellent fuel economy and Toyota reliability.',
    specs: {
      engine: '2.5L 4-Cylinder',
      horsepower: 203,
      mpg: '27/35',
      seats: 5,
      drivetrain: 'AWD',
      color: 'Magnetic Gray'
    }
  },
  {
    id: '3',
    name: 'Model S',
    brand: 'Tesla',
    price: 89990,
    image: sports1,
    images: [sports1],
    year: 2024,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'new',
    category: 'Electric',
    featured: true,
    features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharging'],
    description: 'Premium electric sedan with cutting-edge technology and incredible performance.',
    specs: {
      engine: 'Dual Motor Electric',
      horsepower: 670,
      mpg: '120 MPGe',
      seats: 5,
      drivetrain: 'AWD',
      color: 'Deep Blue Metallic'
    }
  },
  {
    id: '4',
    name: 'Accord',
    brand: 'Honda',
    price: 22500,
    image: sedan1,
    images: [sedan1],
    year: 2021,
    mileage: 25000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'used',
    category: 'Sedan',
    features: ['Honda Sensing', 'Wireless Charging', 'Sunroof', 'Premium Audio'],
    description: 'Well-maintained Honda Accord with low mileage and excellent condition.',
    specs: {
      engine: '1.5L Turbo',
      horsepower: 192,
      mpg: '30/38',
      seats: 5,
      drivetrain: 'FWD',
      color: 'Pearl White'
    }
  },
  {
    id: '5',
    name: 'X5',
    brand: 'BMW',
    price: 45900,
    image: suv1,
    images: [suv1],
    year: 2022,
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'used',
    category: 'SUV',
    features: ['iDrive', 'Panoramic Sunroof', 'Heated Seats', 'Navigation'],
    description: 'Luxury SUV with premium features and exceptional driving dynamics.',
    specs: {
      engine: '3.0L Inline-6 Turbo',
      horsepower: 335,
      mpg: '21/26',
      seats: 7,
      drivetrain: 'AWD',
      color: 'Jet Black'
    }
  },
  {
    id: '6',
    name: 'Mustang',
    brand: 'Ford',
    price: 31500,
    image: sports1,
    images: [sports1],
    year: 2023,
    mileage: 8000,
    fuelType: 'Gasoline',
    transmission: 'Manual',
    condition: 'used',
    category: 'Sports',
    features: ['Performance Package', 'SYNC 4', 'Premium Audio', 'Track Apps'],
    description: 'Iconic American muscle car with thrilling performance and head-turning style.',
    specs: {
      engine: '2.3L EcoBoost',
      horsepower: 310,
      mpg: '21/32',
      seats: 4,
      drivetrain: 'RWD',
      color: 'Race Red'
    }
  }
];

export const categories = [
  'All',
  'Sedan',
  'SUV',
  'Sports',
  'Electric',
  'Truck'
];

export const brands = [
  'All',
  'Toyota',
  'Honda',
  'BMW',
  'Tesla',
  'Ford',
  'Chevrolet',
  'Nissan'
];