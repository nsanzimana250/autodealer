import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 How can we help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputFocus = (field: string) => {
    setActiveField(field);
  };

  const handleInputBlur = () => {
    setActiveField(null);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      text: chatMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    
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

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['123 Auto Street', 'Car City, CC 12345'],
      additional: 'Free parking available',
      action: () => window.open('https://maps.google.com', '_blank')
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      additional: 'Available 7 days a week',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@autodealer.com', 'sales@autodealer.com'],
      additional: 'We respond within 24 hours',
      action: () => window.location.href = 'mailto:info@autodealer.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM'],
      additional: 'Extended hours by appointment',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Live Chat Widget */}
      {showLiveChat && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200 animate-slide-up">
          <div className="bg-primary text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">Live Chat Support</h3>
            <button 
              onClick={() => setShowLiveChat(false)}
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
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!chatMessage.trim()}
                className="bg-primary text-white rounded-full p-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Live Chat Button */}
      <button
        onClick={() => setShowLiveChat(!showLiveChat)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Live chat"
      >
        {showLiveChat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-[40vh] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            Contact <span className="text-accent">AutoDealer</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in-up">
            Get in touch with our expert team. We're here to help you find your perfect vehicle.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="card-automotive p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="name" className={`transition-all duration-300 ${activeField === 'name' ? 'text-accent' : ''}`}>
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => handleInputFocus('name')}
                      onBlur={handleInputBlur}
                      placeholder="Your full name"
                      required
                      className={`transition-all duration-300 ${activeField === 'name' ? 'border-accent ring-2 ring-accent/20' : ''}`}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="email" className={`transition-all duration-300 ${activeField === 'email' ? 'text-accent' : ''}`}>
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => handleInputFocus('email')}
                      onBlur={handleInputBlur}
                      placeholder="your.email@example.com"
                      required
                      className={`transition-all duration-300 ${activeField === 'email' ? 'border-accent ring-2 ring-accent/20' : ''}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="phone" className={`transition-all duration-300 ${activeField === 'phone' ? 'text-accent' : ''}`}>
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onFocus={() => handleInputFocus('phone')}
                      onBlur={handleInputBlur}
                      placeholder="+1 (555) 123-4567"
                      className={`transition-all duration-300 ${activeField === 'phone' ? 'border-accent ring-2 ring-accent/20' : ''}`}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="subject" className={`transition-all duration-300 ${activeField === 'subject' ? 'text-accent' : ''}`}>
                      Subject
                    </Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleInputChange('subject', value)}
                    >
                      <SelectTrigger className={`transition-all duration-300 ${activeField === 'subject' ? 'border-accent ring-2 ring-accent/20' : ''}`}>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="service">Service & Support</SelectItem>
                        <SelectItem value="financing">Financing Options</SelectItem>
                        <SelectItem value="trade-in">Trade-in Valuation</SelectItem>
                        <SelectItem value="appointment">Schedule Appointment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="message" className={`transition-all duration-300 ${activeField === 'message' ? 'text-accent' : ''}`}>
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => handleInputFocus('message')}
                    onBlur={handleInputBlur}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className={`transition-all duration-300 ${activeField === 'message' ? 'border-accent ring-2 ring-accent/20' : ''}`}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-6 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're looking for your first car, upgrading your current vehicle, 
                or need service support, our team is ready to assist you. 
                Contact us through any of the methods below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
                  onClick={info.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-accent to-accent-glow p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {info.title}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {info.details.map((detail, idx) => (
                            <div key={idx}>{detail}</div>
                          ))}
                        </div>
                        <div className="text-xs text-accent mt-2 font-medium">
                          {info.additional}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="card-automotive p-6 hover:shadow-xl transition-all duration-500">
              <h3 className="text-xl font-semibold text-foreground mb-4">Find Our Location</h3>
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1560&q=80')"
                  }}
                >
                  <div className="w-full h-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">View on Google Maps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 hover:border-accent hover:text-accent transition-all group"
                  onClick={() => window.location.href = 'tel:+15551234567'}
                >
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-accent/10 transition-colors">
                    <Phone className="h-5 w-5 text-primary group-hover:text-accent" />
                  </div>
                  <div className="text-left ml-3">
                    <div className="font-medium">Call Now</div>
                    <div className="text-xs text-muted-foreground">Speak with sales team</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4 hover:border-accent hover:text-accent transition-all group"
                  onClick={() => window.location.href = 'mailto:info@autodealer.com'}
                >
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-accent/10 transition-colors">
                    <Mail className="h-5 w-5 text-primary group-hover:text-accent" />
                  </div>
                  <div className="text-left ml-3">
                    <div className="font-medium">Email Us</div>
                    <div className="text-xs text-muted-foreground">Get detailed information</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these CSS animations to your global styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        .card-automotive {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Contact;