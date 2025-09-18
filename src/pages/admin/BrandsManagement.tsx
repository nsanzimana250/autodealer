import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  MoreHorizontal,
  Building2
} from 'lucide-react';
import { brandsData, Brand } from '@/data/brands';

const BrandsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [brands, setBrands] = useState<Brand[]>(brandsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Economy' as Brand['category'],
    founded: '',
    headquarters: '',
    website: '',
    description: '',
    status: 'Active' as Brand['status']
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Partner':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Luxury':
        return 'bg-purple-100 text-purple-800';
      case 'Economy':
        return 'bg-green-100 text-green-800';
      case 'Electric':
        return 'bg-blue-100 text-blue-800';
      case 'Sports':
        return 'bg-red-100 text-red-800';
      case 'Truck':
        return 'bg-orange-100 text-orange-800';
      case 'SUV':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.headquarters.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || brand.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Economy',
      founded: '',
      headquarters: '',
      website: '',
      description: '',
      status: 'Active'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBrand: Brand = {
      id: editingBrand ? editingBrand.id : Math.max(...brands.map(b => b.id)) + 1,
      ...formData,
      founded: parseInt(formData.founded),
      lastModified: new Date().toISOString().split('T')[0],
      addedBy: 'Admin'
    };

    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? newBrand : b));
    } else {
      setBrands([...brands, newBrand]);
    }

    resetForm();
    setIsAddDialogOpen(false);
    setEditingBrand(null);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      category: brand.category,
      founded: brand.founded.toString(),
      headquarters: brand.headquarters,
      website: brand.website || '',
      description: brand.description,
      status: brand.status
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBrands(brands.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Brands Management</h1>
          <p className="text-slate-600 mt-2">Manage automotive brands and partnerships.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <Plus className="h-4 w-4" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value as Brand['category']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    type="number"
                    value={formData.founded}
                    onChange={(e) => setFormData({...formData, founded: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as Brand['status']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input
                  id="headquarters"
                  value={formData.headquarters}
                  onChange={(e) => setFormData({...formData, headquarters: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBrand ? 'Update Brand' : 'Add Brand'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Brands ({filteredBrands.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Headquarters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map((brand) => (
                <TableRow key={brand.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-500" />
                      {brand.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(brand.category)}>
                      {brand.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{brand.founded}</TableCell>
                  <TableCell className="text-slate-600">{brand.headquarters}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(brand.status)}>
                      {brand.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{brand.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(brand.website, '_blank')}
                        disabled={!brand.website}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(brand)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(brand.id)}
                      >
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Brands</p>
                <p className="text-2xl font-bold text-green-600">
                  {brands.filter(brand => brand.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Partners</p>
                <p className="text-2xl font-bold text-blue-600">
                  {brands.filter(brand => brand.status === 'Partner').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Luxury Brands</p>
                <p className="text-2xl font-bold text-purple-600">
                  {brands.filter(brand => brand.category === 'Luxury').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <MoreHorizontal className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Brands</p>
                <p className="text-2xl font-bold text-slate-900">{brands.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-100">
                <Building2 className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandsManagement;