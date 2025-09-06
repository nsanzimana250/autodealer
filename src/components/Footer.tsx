import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, 
  ChevronUp, MessageCircle, X, Send, Loader2 
} from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 How can we help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const location = useLocation();
  const footerRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to footer when "Contact" link is clicked from the same page
  useEffect(() => {
    if (location.hash === '#footer' && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsNewsletterSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsNewsletterSubmitting(false);
      setIsNewsletterSubmitted(true);
      setNewsletterEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsNewsletterSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: chatMessages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to browse our inventory.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Cars', path: '/cars' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' }
  ];

  const services = [
    'Car Financing',
    'Vehicle Trade-In',
    'Test Drive',
    'Maintenance',
    'Warranty',
    'Insurance'
  ];

  return (
    <>
      {/* Live Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isChatOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="bg-white shadow-2xl rounded-2xl w-80 h-96 flex flex-col border border-gray-200">
          <div className="bg-primary text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-accent transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-primary text-white rounded-full p-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground" ref={footerRef} id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-accent p-2 rounded-lg">
                  <Car className="h-6 w-6 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold">AutoDealer</span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Your trusted partner for finding the perfect car. We offer a wide selection of new and used vehicles with excellent customer service.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="pt-4">
                <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
                {isNewsletterSubmitted ? (
                  <div className="bg-accent/20 text-accent p-3 rounded-lg text-sm">
                    Thank you for subscribing! You'll receive our latest updates soon.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-1 bg-white/10 border border-primary-glow/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-primary-foreground/60"
                    />
                    <button
                      type="submit"
                      disabled={isNewsletterSubmitting}
                      className="bg-accent text-accent-foreground rounded-lg px-4 py-2 text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {isNewsletterSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm block py-1 hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Our Services</h3>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="text-primary-foreground/80 text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-accent rounded-full mr-2 group-hover:scale-150 transition-transform"></div>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 group">
                    <div className="bg-primary-glow p-2 rounded-lg group-hover:bg-accent transition-colors">
                      <Phone className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="bg-primary-glow p-2 rounded-lg group-hover:bg-accent transition-colors">
                      <Mail className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <span className="text-primary-foreground/80 text-sm">info@autodealer.com</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="bg-primary-glow p-2 rounded-lg group-hover:bg-accent transition-colors">
                      <MapPin className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <span className="text-primary-foreground/80 text-sm">123 Auto Street, Car City, CC 12345</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Follow Us</h3>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="bg-primary-glow p-3 rounded-lg hover:bg-accent transition-colors group"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary-glow p-3 rounded-lg hover:bg-accent transition-colors group"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary-glow p-3 rounded-lg hover:bg-accent transition-colors group"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-glow/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} AutoDealer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;