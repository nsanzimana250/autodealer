import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, Reply, Archive, Star, StarOff, Mail, Phone, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminContact = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  // Mock contact messages data
  const messages = [
    {
      id: 'MSG-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      subject: 'sales',
      message: 'I\'m interested in the 2024 Toyota Camry. Can you provide more information about financing options?',
      status: 'new',
      priority: 'medium',
      date: '2024-01-25 14:30',
      replied: false
    },
    {
      id: 'MSG-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      subject: 'service',
      message: 'My car is making a strange noise. I need to schedule a maintenance appointment as soon as possible.',
      status: 'replied',
      priority: 'high',
      date: '2024-01-24 09:15',
      replied: true
    },
    {
      id: 'MSG-003',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 (555) 456-7890',
      subject: 'general',
      message: 'What are your business hours? I\'d like to visit your showroom this weekend.',
      status: 'resolved',
      priority: 'low',
      date: '2024-01-23 16:45',
      replied: true
    },
    {
      id: 'MSG-004',
      name: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      phone: '+1 (555) 234-5678',
      subject: 'trade-in',
      message: 'I want to trade in my 2020 Honda Accord for a new electric vehicle. What\'s the process?',
      status: 'in-progress',
      priority: 'medium',
      date: '2024-01-22 11:20',
      replied: false
    },
    {
      id: 'MSG-005',
      name: 'David Wilson',
      email: 'dwilson@email.com',
      phone: '+1 (555) 345-6789',
      subject: 'financing',
      message: 'I have bad credit but need a car urgently. Do you have any financing options for my situation?',
      status: 'new',
      priority: 'high',
      date: '2024-01-21 08:30',
      replied: false
    }
  ];

  const filteredMessages = messages.filter(message => {
    return (
      (message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       message.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === '' || selectedStatus === 'all' || message.status === selectedStatus) &&
      (selectedSubject === '' || selectedSubject === 'all' || message.subject === selectedSubject)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'replied': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubjectLabel = (subject: string) => {
    const subjects: { [key: string]: string } = {
      'general': 'General Inquiry',
      'sales': 'Sales Question',
      'service': 'Service & Support',
      'financing': 'Financing Options',
      'trade-in': 'Trade-in Valuation',
      'appointment': 'Schedule Appointment'
    };
    return subjects[subject] || subject;
  };

  const handleReply = () => {
    // TODO: Implement actual reply functionality
    setReplyText('');
    setSelectedMessage(null);
  };

  const newMessages = messages.filter(m => m.status === 'new').length;
  const totalMessages = messages.length;
  const responseRate = ((messages.filter(m => m.replied).length / totalMessages) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">Manage customer inquiries and communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newMessages}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              -0.3h from last month
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
                placeholder="Search messages..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="sales">Sales Question</SelectItem>
                <SelectItem value="service">Service & Support</SelectItem>
                <SelectItem value="financing">Financing Options</SelectItem>
                <SelectItem value="trade-in">Trade-in Valuation</SelectItem>
                <SelectItem value="appointment">Schedule Appointment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className={message.status === 'new' ? 'bg-blue-50' : ''}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {message.name}
                        {!message.replied && <Badge variant="secondary" className="text-xs">New</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {message.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {message.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getSubjectLabel(message.subject)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-sm">
                      {message.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(message.status)}>
                      {message.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(message.date).toLocaleDateString()}
                    <br />
                    {new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedMessage(message)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View & Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          Mark Important
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
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

      {/* Message Detail Dialog */}
      <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Customer Information</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Name:</strong> {selectedMessage.name}<br />
                    <strong>Email:</strong> {selectedMessage.email}<br />
                    <strong>Phone:</strong> {selectedMessage.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Message Details</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Subject:</strong> {getSubjectLabel(selectedMessage.subject)}<br />
                    <strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}<br />
                    <strong>Priority:</strong> <Badge className={getPriorityColor(selectedMessage.priority)}>{selectedMessage.priority}</Badge>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Original Message</h4>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Reply</h4>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Cancel
                </Button>
                <Button onClick={handleReply} className="btn-primary">
                  <Reply className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContact;