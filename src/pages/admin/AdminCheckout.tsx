import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Download, RefreshCw, CreditCard, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminCheckout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Mock checkout data
  const checkouts = [
    {
      id: 'CHK-001',
      customerName: 'John Smith',
      email: 'john.smith@email.com',
      vehicle: '2024 Toyota Camry',
      amount: 31230,
      paymentMethod: 'Credit Card',
      status: 'completed',
      date: '2024-01-25',
      orderId: 'ORD-2024-001'
    },
    {
      id: 'CHK-002',
      customerName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      vehicle: '2023 Honda Civic',
      amount: 26850,
      paymentMethod: 'Financing',
      status: 'pending',
      date: '2024-01-24',
      orderId: 'ORD-2024-002'
    },
    {
      id: 'CHK-003',
      customerName: 'Michael Chen',
      email: 'mchen@email.com',
      vehicle: '2024 Tesla Model 3',
      amount: 42990,
      paymentMethod: 'Credit Card',
      status: 'completed',
      date: '2024-01-23',
      orderId: 'ORD-2024-003'
    },
    {
      id: 'CHK-004',
      customerName: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      vehicle: '2023 BMW X5',
      amount: 58750,
      paymentMethod: 'Bank Transfer',
      status: 'processing',
      date: '2024-01-22',
      orderId: 'ORD-2024-004'
    },
    {
      id: 'CHK-005',
      customerName: 'David Wilson',
      email: 'dwilson@email.com',
      vehicle: '2024 Ford F-150',
      amount: 45280,
      paymentMethod: 'Financing',
      status: 'failed',
      date: '2024-01-21',
      orderId: 'ORD-2024-005'
    }
  ];

  const filteredCheckouts = checkouts.filter(checkout => {
    return (
      (checkout.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       checkout.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       checkout.vehicle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === '' || selectedStatus === 'all' || checkout.status === selectedStatus) &&
      (selectedPaymentMethod === '' || selectedPaymentMethod === 'all' || checkout.paymentMethod === selectedPaymentMethod)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalRevenue = checkouts
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + c.amount, 0);

  const completedCheckouts = checkouts.filter(c => c.status === 'completed').length;
  const pendingCheckouts = checkouts.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Checkout Management</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage customer purchases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCheckouts}</div>
            <p className="text-xs text-muted-foreground">
              Successful transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCheckouts}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers, vehicles, or order IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Financing">Financing</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Checkouts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Checkouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCheckouts.map((checkout) => (
                <TableRow key={checkout.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{checkout.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {checkout.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{checkout.vehicle}</div>
                      <div className="text-sm text-muted-foreground">
                        {checkout.orderId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${checkout.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{checkout.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(checkout.status)}>
                      {checkout.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(checkout.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refund
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCheckout;