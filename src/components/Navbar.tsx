import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, ShoppingCart, Search, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/cars' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Mock cart items count
  const cartItemsCount = 3;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="AutoDealer Home"
          >
            <div className="bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary transition-colors group-hover:text-primary/80">
              AutoDealer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                  isActive(item.href) ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search button and field */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {searchOpen && (
                <div className="absolute right-0 top-12 bg-white p-2 rounded-md shadow-lg border border-border/50 w-64">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <input
                      type="text"
                      placeholder="Search cars..."
                      className="flex-1 outline-none text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* User account */}
            <Link 
              to="/account" 
              className="hidden sm:block p-2 text-foreground hover:text-accent transition-colors"
              aria-label="My Account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Phone contact */}
            <a 
              href="tel:+1234567890" 
              className="hidden md:flex items-center text-foreground hover:text-accent transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-sm">+1 (234) 567-890</span>
            </a>

            {/* Cart with animated badge */}
            <Link 
              to="/cart" 
              className="relative p-2 text-foreground hover:text-accent transition-colors group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform group-hover:scale-110">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-border/50 shadow-md">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-foreground hover:text-accent hover:bg-accent/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile-only additional links */}
            <div className="border-t border-border/30 pt-3 mt-3">
              <a 
                href="tel:+1234567890" 
                className="flex items-center px-3 py-2 text-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (234) 567-890</span>
              </a>
              <Link 
                to="/account" 
                className="flex items-center px-3 py-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                <span>My Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
