import { useState, useEffect } from 'react';
import { getTags, createTag, updateTag, deleteTag } from '@/services/tagService';
import { useUI } from '@/context/UIContext/useUI';
import { getErrorMessage } from '@/utils/errorHandler';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Edit2, Trash2, Search, Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TagsPage() {
  const { showSuccess, showError } = useUI();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
  });

  const fetchTags = async () => {
    try {
      const { data } = await getTags();
      if (data.data) {
        setTags(data.data);
      }
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (editingTag) {
        await updateTag(editingTag._id, formData);
        showSuccess('Tag updated successfully');
      } else {
        await createTag(formData);
        showSuccess('Tag created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
      fetchTags();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;
    try {
      await deleteTag(id);
      showSuccess('Tag deleted successfully');
      fetchTags();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTag(null);
    setFormData({ name: '' });
  };

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Tag Management</h1>
          <p className='text-muted-foreground'>Manage product tags for easier filtering and discovery.</p>
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
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingTag ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
                <DialogDescription>Enter the name for the tag. It will be automatically slugified.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input id='name' value={formData.name} onChange={handleChange} required placeholder='e.g. Organic, Fresh...' />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' disabled={submitLoading} className='w-full'>
                  {submitLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  {editingTag ? 'Save Changes' : 'Create Tag'}
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
              <Input placeholder='Search tags...' className='pl-8' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='ml-auto'>
              <Badge variant='secondary' className='rounded-sm px-2 font-normal'>
                {filteredTags.length} Total Tags
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[40px]'></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className='hidden md:table-cell'>Slug</TableHead>
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
                ) : filteredTags.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='h-24 text-center'>
                      No tags found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTags.map((tag) => (
                    <TableRow key={tag._id}>
                      <TableCell>
                        <TagIcon className='h-4 w-4 text-muted-foreground' />
                      </TableCell>
                      <TableCell className='font-medium'>{tag.name}</TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <code className='rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>{tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-')}</code>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='ghost' size='icon' onClick={() => handleEdit(tag)}>
                            <Edit2 className='h-4 w-4' />
                          </Button>
                          <Button variant='ghost' size='icon' className='text-destructive' onClick={() => handleDelete(tag._id)}>
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
