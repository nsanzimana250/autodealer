import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample content data
  const contentItems = [
    {
      id: 1,
      title: 'Homepage Hero Section',
      type: 'Page',
      status: 'Published',
      lastModified: '2024-01-15',
      author: 'Admin',
    },
    {
      id: 2,
      title: 'About Us Page',
      type: 'Page',
      status: 'Published',
      lastModified: '2024-01-14',
      author: 'Admin',
    },
    {
      id: 3,
      title: 'Car Listing Features',
      type: 'Content Block',
      status: 'Draft',
      lastModified: '2024-01-13',
      author: 'Admin',
    },
    {
      id: 4,
      title: 'Customer Testimonials',
      type: 'Component',
      status: 'Published',
      lastModified: '2024-01-12',
      author: 'Admin',
    },
    {
      id: 5,
      title: 'Contact Information',
      type: 'Page',
      status: 'Published',
      lastModified: '2024-01-11',
      author: 'Admin',
    },
    {
      id: 6,
      title: 'Services Overview',
      type: 'Content Block',
      status: 'Published',
      lastModified: '2024-01-10',
      author: 'Admin',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-600 mt-2">Manage your website pages and content blocks.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Content ({filteredContent.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{item.lastModified}</TableCell>
                  <TableCell className="text-slate-600">{item.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {contentItems.filter(item => item.status === 'Published').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contentItems.filter(item => item.status === 'Draft').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Edit className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-blue-600">{contentItems.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <MoreHorizontal className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentManagement;