import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const Checkout = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional Options
    financing: false,
    insurance: false,
    warranty: false
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout submitted:', formData);
    // Handle checkout submission
  };

  // Mock order summary
  const orderSummary = {
    subtotal: 28500,
    tax: 2280,
    financing: formData.financing ? 350 : 0,
    insurance: formData.insurance ? 150 : 0,
    warranty: formData.warranty ? 200 : 0
  };

  const total = Object.values(orderSummary).reduce((sum, value) => sum + value, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/cart" 
            className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your vehicle purchase</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="card-automotive p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="card-automotive p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Billing Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card-automotive p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-success" />
                  Payment Information
                </h2>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="h-5 w-5 mb-2" />
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">Secure payment</div>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      paymentMethod === 'financing' 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setPaymentMethod('financing')}
                  >
                    <div className="font-medium">Financing</div>
                    <div className="text-sm text-muted-foreground">As low as 3.9% APR</div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'financing' && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">Financing Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get pre-approved for financing with rates as low as 3.9% APR.
                    </p>
                    <Button variant="outline" type="button">
                      Apply for Financing
                    </Button>
                  </div>
                )}
              </div>

              {/* Additional Options */}
              <div className="card-automotive p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Additional Options</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="financing"
                      checked={formData.financing}
                      onCheckedChange={(checked) => handleInputChange('financing', checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="financing" className="font-medium cursor-pointer">
                        Extended Financing (+$350)
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Extend your payment terms for lower monthly payments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="insurance"
                      checked={formData.insurance}
                      onCheckedChange={(checked) => handleInputChange('insurance', checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="insurance" className="font-medium cursor-pointer">
                        Gap Insurance (+$150)
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Protect your investment with gap coverage
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="warranty"
                      checked={formData.warranty}
                      onCheckedChange={(checked) => handleInputChange('warranty', checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="warranty" className="font-medium cursor-pointer">
                        Extended Warranty (+$200)
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Additional 2 years of comprehensive coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary text-lg py-6">
                <Lock className="h-5 w-5 mr-2" />
                Complete Purchase - ${total.toLocaleString()}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="card-automotive p-6 h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-12 bg-gradient-to-r from-primary to-primary-glow rounded"></div>
                  <div>
                    <div className="font-medium">2024 Toyota Camry</div>
                    <div className="text-sm text-muted-foreground">New • Sedan</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle Price</span>
                  <span>${orderSummary.subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax & Fees</span>
                  <span>${orderSummary.tax.toLocaleString()}</span>
                </div>
                
                {formData.financing && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extended Financing</span>
                    <span>+${orderSummary.financing.toLocaleString()}</span>
                  </div>
                )}
                
                {formData.insurance && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gap Insurance</span>
                    <span>+${orderSummary.insurance.toLocaleString()}</span>
                  </div>
                )}
                
                {formData.warranty && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extended Warranty</span>
                    <span>+${orderSummary.warranty.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-success/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-success">Secure Purchase</div>
                  <div className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;