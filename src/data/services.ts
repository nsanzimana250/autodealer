import { TrendingUp, CheckCircle, Calendar, Shield, Car, Wrench, DollarSign, FileText } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: any;
  price: string;
  duration: string;
  features: string[];
  image: string;
  category: 'financing' | 'maintenance' | 'sales' | 'support';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export const servicesData: Service[] = [
  {
    id: '1',
    title: 'Car Financing',
    description: 'Flexible financing options with competitive rates',
    longDescription: 'Get the best financing deals with our network of trusted lenders. We offer competitive interest rates, flexible payment terms, and quick approval processes to help you drive away in your dream car today.',
    icon: TrendingUp,
    price: 'Starting at 3.9% APR',
    duration: '24-84 months',
    features: [
      'Competitive interest rates starting at 3.9% APR',
      'Flexible payment terms from 24 to 84 months',
      'Quick pre-approval process',
      'No hidden fees or charges',
      'Bad credit? No problem - we have options',
      'Online application available 24/7'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'financing',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Vehicle Trade-In',
    description: 'Get the best value for your current vehicle',
    longDescription: 'Maximize the value of your current vehicle with our professional trade-in service. Our certified appraisers provide fair market value assessments and handle all the paperwork to make your upgrade seamless.',
    icon: CheckCircle,
    price: 'Free Appraisal',
    duration: '30 minutes',
    features: [
      'Professional vehicle appraisal',
      'Fair market value assessment',
      'Instant trade-in quotes',
      'All paperwork handled for you',
      'Clean title verification',
      'Same-day processing available'
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'sales',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Test Drive',
    description: 'Schedule a test drive at your convenience',
    longDescription: 'Experience your potential new vehicle firsthand with our flexible test drive scheduling. Take your time to ensure the car meets your expectations before making your decision.',
    icon: Calendar,
    price: 'Free',
    duration: '15-30 minutes',
    features: [
      'Flexible scheduling - 7 days a week',
      'Extended test drives available',
      'Multiple vehicle comparisons',
      'Professional guidance included',
      'Insurance coverage provided',
      'No pressure, take your time'
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'sales',
    status: 'active',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    title: 'Maintenance & Service',
    description: 'Professional servicing and maintenance',
    longDescription: 'Keep your vehicle running at peak performance with our comprehensive maintenance and repair services. Our certified technicians use only genuine parts and follow manufacturer specifications.',
    icon: Shield,
    price: 'Starting at $89',
    duration: '1-4 hours',
    features: [
      'Certified technicians',
      'Genuine OEM parts',
      'Comprehensive diagnostics',
      'Warranty on all work',
      'Shuttle service available',
      'Online service scheduling'
    ],
    image: 'https://images.unsplash.com/photo-1632823469454-b9b60d5d52b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'maintenance',
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-25'
  },
  {
    id: '5',
    title: 'Vehicle Inspection',
    description: 'Comprehensive pre-purchase inspections',
    longDescription: 'Ensure your potential purchase is in excellent condition with our thorough vehicle inspection service. Our detailed reports give you confidence in your buying decision.',
    icon: FileText,
    price: '$199',
    duration: '2-3 hours',
    features: [
      'Comprehensive 150-point inspection',
      'Detailed written report',
      'Digital photos included',
      'Mechanic recommendations',
      'Resale value assessment',
      'Peace of mind guarantee'
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'support',
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  },
  {
    id: '6',
    title: 'Extended Warranty',
    description: 'Comprehensive coverage beyond manufacturer warranty',
    longDescription: 'Protect your investment with our extended warranty programs. Choose from various coverage levels to ensure your vehicle is protected long after your purchase.',
    icon: Shield,
    price: 'Starting at $1,299',
    duration: '12-84 months',
    features: [
      'Comprehensive coverage options',
      'Nationwide service network',
      '24/7 roadside assistance',
      'Rental car reimbursement',
      'Transferable coverage',
      'No deductible options available'
    ],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'support',
    status: 'active',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-20'
  }
];

export const serviceCategories = ['financing', 'maintenance', 'sales', 'support'];