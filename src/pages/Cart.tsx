import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, CheckCircle, Truck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Camry',
    brand: 'Toyota',
    price: 28500,
    image: '/api/placeholder/300/200',
    year: 2024,
    condition: 'new' as const,
    quantity: 1
  },
  {
    id: '2',
    name: 'Civic',
    brand: 'Honda',
    price: 26500,
    image: '/api/placeholder/300/200',
    year: 2023,
    condition: 'used' as const,
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [pulseItem, setPulseItem] = useState<string | null>(null);
  const previousQuantityRef = useRef<Record<string, number>>({});

  // Track previous quantities for animation
  useEffect(() => {
    const newPrevQuantities: Record<string, number> = {};
    cartItems.forEach(item => {
      newPrevQuantities[item.id] = item.quantity;
    });
    previousQuantityRef.current = newPrevQuantities;
  }, [cartItems]);

  const updateQuantity = async (id: string, newQuantity: number) => {
    setIsUpdating(id);
    
    // Trigger pulse animation if quantity increased
    if (newQuantity > (previousQuantityRef.current[id] || 0)) {
      setPulseItem(id);
      setTimeout(() => setPulseItem(null), 500);
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setIsUpdating(null);
  };

  const removeItem = async (id: string) => {
    setIsRemoving(id);
    
    // Simulate API call delay with animation time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCartItems(items => items.filter(item => item.id !== id));
    setIsRemoving(null);
  };

  const clearCart = async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setCartItems([]);
    setIsClearing(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
              <div className="absolute -inset-4 bg-primary/10 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Looks like you haven't added any cars to your cart yet.
            </p>
            <Link to="/cars" className="animate-fade-in delay-200">
              <Button className="btn-primary text-lg px-8 py-4 group hover:scale-105 transition-transform duration-300">
                Browse Cars
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with animated gradient */}
      <div className="bg-gradient-to-r from-primary via-primary-glow to-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">Shopping Cart</h1>
          <p className="text-xl text-white/90 animate-slide-down delay-75">Review your selected vehicles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between animate-fade-in">
              <h2 className="text-2xl font-semibold text-foreground">
                Cart Items ({cartItems.length})
              </h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                disabled={isClearing}
                className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300 relative overflow-hidden"
              >
                {isClearing ? (
                  <>
                    <span className="animate-pulse">Clearing...</span>
                    <span className="absolute inset-0 bg-destructive/10 animate-pulse"></span>
                  </>
                ) : (
                  'Clear Cart'
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`card-automotive p-6 transition-all duration-500 overflow-hidden animate-fade-in-up ${
                    isRemoving === item.id 
                      ? 'opacity-0 max-h-0 py-0 -mt-4 scale-95' 
                      : 'opacity-100 max-h-96'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Car Image with enhanced hover effect */}
                    <div className="w-full md:w-56 h-40 overflow-hidden rounded-lg group relative">
                      <img
                        src={item.image}
                        alt={`${item.brand} ${item.name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <Sparkles className="h-5 w-5 text-yellow-300" />
                      </div>
                    </div>

                    {/* Car Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={item.condition === 'new' ? 'default' : 'secondary'} className="animate-pop-in">
                              {item.condition === 'new' ? 'New' : 'Used'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {item.brand} {item.name}
                          </h3>
                          <Link 
                            to={`/cars/${item.id}`}
                            className="text-accent hover:underline text-sm inline-flex items-center group/link mt-1 transition-all duration-300 hover:text-accent/80"
                          >
                            View Details
                            <ArrowRight className="h-3 w-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110"
                          disabled={isRemoving === item.id}
                        >
                          {isRemoving === item.id ? (
                            <div className="h-4 w-4 border-2 border-destructive border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-2xl font-bold text-accent animate-fade-in">
                          ${item.price.toLocaleString()}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className={`flex items-center border border-border rounded-lg overflow-hidden transition-all duration-300 ${pulseItem === item.id ? 'ring-2 ring-accent/50' : ''}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating === item.id}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center transition-all duration-300">
                              {isUpdating === item.id ? (
                                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                <span className="inline-block animate-quantity-change">{item.quantity}</span>
                              )}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-automotive p-6 h-fit sticky top-24 space-y-6 animate-fade-in-left">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                Order Summary
                <span className="ml-2 h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center animate-fade-in delay-100">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center animate-fade-in delay-200">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">${tax.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground animate-fade-in delay-300">
                  <span>Estimated Delivery</span>
                  <span>{estimatedDelivery.toLocaleDateString()}</span>
                </div>
                
                <Separator className="animate-fade-in delay-400" />
                
                <div className="flex justify-between items-center text-lg font-semibold animate-fade-in delay-500">
                  <span>Total</span>
                  <span className="text-accent animate-pop-in">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/checkout" className="block animate-fade-in delay-600">
                  <Button className="w-full btn-primary text-lg py-6 group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></span>
                  </Button>
                </Link>
                
                <Link to="/cars" className="block animate-fade-in delay-700">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:border-primary/50">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-border/50 animate-fade-in delay-800">
                <div className="flex items-center justify-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-sm transition-all duration-300 hover:text-foreground hover:scale-105">
                    <Shield className="h-4 w-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm transition-all duration-300 hover:text-foreground hover:scale-105">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm transition-all duration-300 hover:text-foreground hover:scale-105">
                    <Truck className="h-4 w-4" />
                    <span>Free Delivery</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-4 bg-muted/30 rounded-lg animate-fade-in delay-900">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent animate-pulse" />
                  What's Included:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  {[
                    "Pre-delivery inspection",
                    "Vehicle history report",
                    "30-day warranty",
                    "Registration assistance"
                  ].map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-center gap-2 transition-all duration-300 hover:text-foreground hover:translate-x-1"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pop-in"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: popIn 0.3s ease-out forwards;
        }
        @keyframes quantityChange {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-quantity-change {
          animation: quantityChange 0.3s ease-out;
        }
        .delay-75 { animation-delay: 75ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
      `}</style>
    </div>
  );
};

export default Cart;