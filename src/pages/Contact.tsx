import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['123 Auto Street', 'Car City, CC 12345'],
      additional: 'Free parking available'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      additional: 'Available 7 days a week'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@autodealer.com', 'sales@autodealer.com'],
      additional: 'We respond within 24 hours'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM'],
      additional: 'Extended hours by appointment'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-glow text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Get in touch with our expert team. We're here to help you find your perfect vehicle.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="card-automotive p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-primary text-lg py-6">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're looking for your first car, upgrading your current vehicle, 
                or need service support, our team is ready to assist you. 
                Contact us through any of the methods below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="card-automotive p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-accent to-accent-glow p-3 rounded-lg flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
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
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="card-automotive p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Find Our Location</h3>
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">123 Auto Street, Car City, CC 12345</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Phone className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Call Now</div>
                    <div className="text-xs text-muted-foreground">Speak with sales team</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Mail className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Email Us</div>
                    <div className="text-xs text-muted-foreground">Get detailed information</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;