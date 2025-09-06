import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock cart data - in a real app, this would come from a state management solution
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
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-8" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Looks like you haven't added any cars to your cart yet.
            </p>
            <Link to="/cars">
              <Button className="btn-primary text-lg px-8 py-4">
                Browse Cars
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl text-white/90">Review your selected vehicles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Cart Items ({cartItems.length})
              </h2>
              <Button variant="outline" size="sm" onClick={() => setCartItems([])}>
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card-automotive p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Car Image */}
                    <div className="w-full md:w-48 h-36 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={`${item.brand} ${item.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Car Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={item.condition === 'new' ? 'default' : 'secondary'}>
                              {item.condition === 'new' ? 'New' : 'Used'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {item.brand} {item.name}
                          </h3>
                          <Link 
                            to={`/cars/${item.id}`}
                            className="text-accent hover:underline text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-accent">
                          ${item.price.toLocaleString()}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
          <div className="card-automotive p-6 h-fit sticky top-24">
            <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${tax.toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Link to="/checkout">
                <Button className="w-full btn-primary text-lg py-6">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/cars">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">What's Included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pre-delivery inspection</li>
                <li>• Vehicle history report</li>
                <li>• 30-day warranty</li>
                <li>• Registration assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;