export interface Brand {
  id: number;
  name: string;
  logo?: string;
  category: 'Luxury' | 'Economy' | 'Electric' | 'Sports' | 'Truck' | 'SUV';
  founded: number;
  headquarters: string;
  website?: string;
  status: 'Active' | 'Inactive' | 'Partner';
  description: string;
  lastModified: string;
  addedBy: string;
}

export const brandsData: Brand[] = [
  {
    id: 1,
    name: 'Toyota',
    category: 'Economy',
    founded: 1937,
    headquarters: 'Toyota City, Japan',
    website: 'https://www.toyota.com',
    status: 'Active',
    description: 'Japanese multinational automotive manufacturer known for reliability and fuel efficiency.',
    lastModified: '2024-01-15',
    addedBy: 'Admin'
  },
  {
    id: 2,
    name: 'BMW',
    category: 'Luxury',
    founded: 1916,
    headquarters: 'Munich, Germany',
    website: 'https://www.bmw.com',
    status: 'Partner',
    description: 'German luxury vehicle manufacturer known for performance and innovative technology.',
    lastModified: '2024-01-14',
    addedBy: 'Admin'
  },
  {
    id: 3,
    name: 'Tesla',
    category: 'Electric',
    founded: 2003,
    headquarters: 'Austin, Texas',
    website: 'https://www.tesla.com',
    status: 'Active',
    description: 'American electric vehicle and clean energy company leading the EV revolution.',
    lastModified: '2024-01-13',
    addedBy: 'Admin'
  },
  {
    id: 4,
    name: 'Mercedes-Benz',
    category: 'Luxury',
    founded: 1926,
    headquarters: 'Stuttgart, Germany',
    website: 'https://www.mercedes-benz.com',
    status: 'Partner',
    description: 'German luxury automotive brand known for innovation, quality, and premium vehicles.',
    lastModified: '2024-01-12',
    addedBy: 'Admin'
  },
  {
    id: 5,
    name: 'Ford',
    category: 'Economy',
    founded: 1903,
    headquarters: 'Dearborn, Michigan',
    website: 'https://www.ford.com',
    status: 'Active',
    description: 'American multinational automaker with a rich history of innovation and mass production.',
    lastModified: '2024-01-11',
    addedBy: 'Admin'
  },
  {
    id: 6,
    name: 'Honda',
    category: 'Economy',
    founded: 1946,
    headquarters: 'Tokyo, Japan',
    website: 'https://www.honda.com',
    status: 'Active',
    description: 'Japanese public multinational conglomerate known for motorcycles, automobiles, and power equipment.',
    lastModified: '2024-01-10',
    addedBy: 'Admin'
  },
  {
    id: 7,
    name: 'Audi',
    category: 'Luxury',
    founded: 1910,
    headquarters: 'Ingolstadt, Germany',
    website: 'https://www.audi.com',
    status: 'Partner',
    description: 'German luxury automotive brand known for quattro all-wheel drive and premium engineering.',
    lastModified: '2024-01-09',
    addedBy: 'Admin'
  },
  {
    id: 8,
    name: 'Chevrolet',
    category: 'Economy',
    founded: 1911,
    headquarters: 'Detroit, Michigan',
    website: 'https://www.chevrolet.com',
    status: 'Active',
    description: 'American automobile division of General Motors known for affordable and reliable vehicles.',
    lastModified: '2024-01-08',
    addedBy: 'Admin'
  },
  {
    id: 9,
    name: 'Porsche',
    category: 'Sports',
    founded: 1931,
    headquarters: 'Stuttgart, Germany',
    website: 'https://www.porsche.com',
    status: 'Partner',
    description: 'German automobile manufacturer specializing in high-performance sports cars and SUVs.',
    lastModified: '2024-01-07',
    addedBy: 'Admin'
  },
  {
    id: 10,
    name: 'Lexus',
    category: 'Luxury',
    founded: 1989,
    headquarters: 'Nagoya, Japan',
    website: 'https://www.lexus.com',
    status: 'Active',
    description: 'Luxury vehicle division of Toyota known for reliability, comfort, and hybrid technology.',
    lastModified: '2024-01-06',
    addedBy: 'Admin'
  }
];