import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-accent p-2 rounded-lg">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">AutoDealer</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for finding the perfect car. We offer a wide selection of new and used vehicles with excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/cars" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Browse Cars
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">info@autodealer.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">123 Auto Street, Car City, CC 12345</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary-glow p-2 rounded-lg hover:bg-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-primary-glow p-2 rounded-lg hover:bg-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-primary-glow p-2 rounded-lg hover:bg-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-glow/30 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 AutoDealer. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;