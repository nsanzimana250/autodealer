import { useState, useEffect } from 'react';
import { User, Settings, ShoppingCart, Heart, MapPin, Phone, Mail, Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setUserInfo({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  }, [user, navigate]);

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      car: '2023 Honda Civic',
      status: 'Completed',
      amount: '$25,000'
    },
    {
      id: 'ORD-002', 
      date: '2024-02-20',
      car: '2024 Toyota Camry',
      status: 'Processing',
      amount: '$28,500'
    }
  ];

  const favoriteItems = [
    {
      id: 1,
      name: '2024 BMW X5',
      price: '$65,000',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: '2023 Mercedes C-Class',
      price: '$45,000', 
      image: '/api/placeholder/300/200'
    }
  ];

  const handleSave = () => {
    updateUser(userInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Will redirect to login
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Manage your profile and view your activity</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          />
                        ) : (
                          <p className="p-2 bg-muted rounded-md">{userInfo.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          />
                        ) : (
                          <p className="p-2 bg-muted rounded-md">{userInfo.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          />
                        ) : (
                          <p className="p-2 bg-muted rounded-md">{userInfo.phone}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={userInfo.address}
                            onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                          />
                        ) : (
                          <p className="p-2 bg-muted rounded-md">{userInfo.address}</p>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="btn-primary">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/cars">
                      <Button variant="outline" className="w-full justify-start">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Browse Cars
                      </Button>
                    </Link>
                    <Link to="/cart">
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary">{order.id}</Badge>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <h3 className="font-semibold">{order.car}</h3>
                        <p className="text-muted-foreground text-sm">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{order.amount}</p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-primary font-bold text-lg mb-3">{item.price}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1 btn-primary">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Email Notifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Order updates</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">New arrivals</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Promotional offers</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Privacy</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Profile visibility</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Share purchase history</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Your Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;