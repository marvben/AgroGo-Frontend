import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService';
import { useUI } from '@/context/UIContext/useUI';
import { getErrorMessage } from '@/utils/errorHandler';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CategoriesPage() {
  const { showSuccess, showError } = useUI();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      if (data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
        showSuccess('Category updated successfully');
      } else {
        await createCategory(formData);
        showSuccess('Category created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      showSuccess('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
  };

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Category Management</h1>
          <p className='text-muted-foreground'>Manage product categories available in the marketplace.</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className='gap-2'>
              <Plus className='h-4 w-4' />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                <DialogDescription>Enter the details for the category. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' value={formData.name} onChange={handleChange} required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' value={formData.description} onChange={handleChange} rows={3} />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='image'>Image URL</Label>
                  <Input id='image' value={formData.image} onChange={handleChange} placeholder='https://example.com/image.jpg' />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' disabled={submitLoading} className='w-full'>
                  {submitLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input placeholder='Search categories...' className='pl-8' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='ml-auto'>
              <Badge variant='secondary' className='rounded-sm px-2 font-normal lg:hidden'>
                {filteredCategories.length} Categories
              </Badge>
              <div className='hidden items-center space-x-1 lg:flex'>
                <Badge variant='secondary' className='rounded-sm px-2 font-normal'>
                  {filteredCategories.length} Total Categories
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[80px]'>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className='hidden md:table-cell'>Description</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className='h-24 text-center'>
                      <Loader2 className='h-6 w-6 animate-spin mx-auto' />
                    </TableCell>
                  </TableRow>
                ) : filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='h-24 text-center'>
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={category.image} alt={category.name} />
                          <AvatarFallback>{category.name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className='font-medium'>{category.name}</TableCell>
                      <TableCell className='hidden md:table-cell max-w-[300px] truncate'>{category.description || '-'}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='ghost' size='icon' onClick={() => handleEdit(category)}>
                            <Edit2 className='h-4 w-4' />
                          </Button>
                          <Button variant='ghost' size='icon' className='text-destructive' onClick={() => handleDelete(category._id)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
