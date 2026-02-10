import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/useAuth';
import { useProduct } from '@/context/ProductContext/useProduct';
import { useState, useEffect } from 'react';
import ConfirmDeletePopUp from '@/components/ConfirmDeletePopUp/ConfirmDeletePopUp';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit, Trash2, ArrowUpDown, Plus, MoreHorizontal, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function ProductTable() {
  const { getManyProducts, removeProduct } = useProduct();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchProducts = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const results = await getManyProducts({ id: user._id }); // Fetch all user products
      setProducts(results || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user?._id]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const ok = await removeProduct({
      userId: user._id,
      productId: productToDelete._id,
    });

    if (ok) {
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setOpenDelete(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='flex h-[400px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>My Products</h2>
          <p className='text-muted-foreground'>Manage your product listings and inventory.</p>
        </div>
        <Button asChild>
          <Link to='/dashboard/create-product'>
            <Plus className='mr-2 h-4 w-4' /> Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='h-24 text-center'>
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img src={product.images?.[0]?.secure_url || 'https://placehold.co/50'} alt={product.title} className='aspect-square rounded-md object-cover h-12 w-12' />
                    </TableCell>
                    <TableCell className='font-medium'>{product.title}</TableCell>
                    <TableCell>{typeof product.category === 'object' ? product.category.name : product.category}</TableCell>
                    <TableCell>₦{Number(product.price).toLocaleString()}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}>
                            <Edit className='mr-2 h-4 w-4' /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClick(product)} className='text-destructive focus:text-destructive'>
                            <Trash2 className='mr-2 h-4 w-4' /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDeletePopUp name={productToDelete?.title} open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={handleConfirmDelete} type='product' />
    </div>
  );
}
