import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  CreditCard,
  ShoppingCart,
  UserPlus,
  MessageCircle,
  Settings,
  FileText,
  Calendar,
  Eye,
  ArrowRight,
  Star,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data
  const stats = [
    { icon: Users, title: 'Total Users', value: '2,847', change: '+12%', color: 'text-blue-600' },
    { icon: Car, title: 'Cars Listed', value: '156', change: '+5%', color: 'text-green-600' },
    { icon: DollarSign, title: 'Revenue', value: '$47,890', change: '+18%', color: 'text-yellow-600' },
    { icon: TrendingUp, title: 'Growth Rate', value: '23.5%', change: '+2.3%', color: 'text-purple-600' },
  ];

  const salesData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 2000, revenue: 9800 },
    { month: 'Apr', sales: 2780, revenue: 3908 },
    { month: 'May', sales: 1890, revenue: 4800 },
    { month: 'Jun', sales: 2390, revenue: 3800 },
  ];

  const trafficData = [
    { name: 'Direct', value: 35, color: '#3b82f6' },
    { name: 'Search', value: 28, color: '#10b981' },
    { name: 'Social', value: 22, color: '#f59e0b' },
    { name: 'Referral', value: 15, color: '#ef4444' },
  ];

  const recentActivity = [
    { icon: Eye, text: 'New user registered', time: '2 mins ago' },
    { icon: ShoppingCart, text: 'Car purchase completed', time: '15 mins ago' },
    { icon: MessageSquare, text: 'New inquiry received', time: '1 hour ago' },
    { icon: Star, text: 'Review posted', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Cars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                  <div className="p-2 rounded-lg bg-white">
                    <activity.icon className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{activity.text}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Website Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Management</CardTitle>
            <CardDescription>Manage your website content and services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/cars">
                <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                  <Car className="h-5 w-5 mb-1" />
                  <span className="text-xs">Cars</span>
                </Button>
              </Link>
              <Link to="/admin/services">
                <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                  <Settings className="h-5 w-5 mb-1" />
                  <span className="text-xs">Services</span>
                </Button>
              </Link>
              <Link to="/admin/content">
                <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs">Content</span>
                </Button>
              </Link>
              <Link to="/admin/contact">
                <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                  <MessageCircle className="h-5 w-5 mb-1" />
                  <span className="text-xs">Messages</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New car added', detail: '2024 Tesla Model 3', time: '2 minutes ago', icon: Car },
                { action: 'Service request', detail: 'Maintenance appointment', time: '15 minutes ago', icon: Calendar },
                { action: 'Contact message', detail: 'Sales inquiry from John Smith', time: '1 hour ago', icon: MessageCircle },
                { action: 'Checkout completed', detail: '$45,230 - Toyota Camry', time: '2 hours ago', icon: CreditCard },
                { action: 'Content updated', detail: 'About Us page modified', time: '3 hours ago', icon: FileText }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
            <div className="mt-4">
              <Link to="/admin/analytics">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  View Analytics <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
            <div className="mt-4">
              <Link to="/admin/services">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  Manage Services <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 new this week
            </p>
            <div className="mt-4">
              <Link to="/admin/cars">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  Manage Cars <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;