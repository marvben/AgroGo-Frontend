import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, LinearProgress, Stack, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, TableSortLabel } from '@mui/material';
import { useAuth } from '@/context/AuthContext/useAuth';
import { useProduct } from '@/context/ProductContext/useProduct';
import ConfirmDeletePopUp from '@/components/ConfirmDeletePopUp/ConfirmDeletePopUp';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function ProductTable() {
  const navigate = useNavigate();
  const { getManyProducts, removeProduct } = useProduct();
  const { user, loading } = useAuth();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [open, setOpen] = useState(false);
  const [productToDeleteID, setProductToDeleteID] = useState('');
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productToDeleteName, setProductToDeleteName] = useState('Product');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchProducts({
      property: orderBy,
      newOrder: order,
      id: user._id,
      limit,
      cursor: nextCursor,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setLimit(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleDeleteClick = (p) => {
    setOpen(true);
    setProductToDeleteID(p?._id);
    setProductToDeleteName(p?.title);
  };

  const handleConfirmDelete = async () => {
    const ok = await removeProduct({
      userId: user._id,
      productId: productToDeleteID,
    });

    if (ok) {
      const newProductList = products.filter((product) => productToDeleteID != product._id);
      setCount((...count) => count - 1);
      setLimit((...limit) => limit);
      setProducts(newProductList);
    }
  };

  const fetchProducts = async (params) => {
    try {
      const data = await getManyProducts(params);

      if (!data) {
        setProducts([]);
        setCount(0);
        console.log('No data');
        return;
      }
      const { results, count, hasNextPage, nextCursor } = data;
      setProducts(results);
      setCount(count);
      setHasNextPage(hasNextPage);
      setNextCursor(nextCursor);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts({
      property: orderBy,
      newOrder: order,
      id: user._id,
      limit,
      cursor: nextCursor,
    });
  }, [orderBy, order, user?._id, limit]);

  const headCells = [
    { id: 'title', label: 'Product Name' },
    { id: 'createdAt', label: 'Date Created' },
    { id: 'categories', label: 'Categories' },
    { id: 'tags', label: 'Tags' },
    { id: 'price', label: 'Price' },
    { id: 'image', label: 'Image' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#0f172a',
      }}
    >
      {loading ? (
        <Stack
          sx={{
            width: '100%',
            color: 'grey.500',
            py: 10,
            textAlign: 'center',
          }}
          spacing={2}
        >
          <LinearProgress color='secondary' />
          <LinearProgress color='success' />
          <LinearProgress color='inherit' />
          <Typography sx={{ mt: 2 }}>Products Loading...</Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ mb: 4, maxHeight: '80vh' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                zIndex: 1,
              }}
            >
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleRequestSort(headCell.id)}>
                      <strong>{headCell.label}</strong>
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align='center'>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products?.map((p) => (
                <TableRow key={p?._id}>
                  <TableCell className='hover:font-bold hover:cursor-pointer hover:text-primary transition-all duration-600 ease-in-out' onClick={() => navigate(`/dashboard/edit-product/${p._id}`)}>
                    {p?.title}
                  </TableCell>
                  <TableCell>{new Date(p?.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{p?.categories}</TableCell>
                  <TableCell>{p?.tags}</TableCell>
                  <TableCell>{p?.price}</TableCell>
                  <TableCell>
                    <img
                      src={p?.images[0]?.secure_url}
                      alt={p?.title}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        objectFit: 'cover',
                      }}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/edit-product/${p._id}`)} className='hover:cursor-pointer'>
                          <Edit className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteClick(p)} className='text-destructive focus:text-destructive hover:cursor-pointer'>
                          <Trash2 className='mr-2 h-4 w-4' /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {count > 0 && (
        <TablePagination
          component='div'
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          color='#0f172a'
          size='large'
          sx={{
            mt: 2,
            bgcolor: '#fff',
            borderRadius: 2,
            px: 2,
            py: 1,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      )}
      <ConfirmDeletePopUp
        name={productToDeleteName}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        type='product' // or "account"
      />
    </Box>
  );
}

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext/useAuth';
// import { useProduct } from '@/context/ProductContext/useProduct';
// import { useState, useEffect } from 'react';
// import ConfirmDeletePopUp from '@/components/ConfirmDeletePopUp/ConfirmDeletePopUp';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Edit, Trash2, ArrowUpDown, Plus, MoreHorizontal, Loader2 } from 'lucide-react';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// export default function ProductTable() {
//   const { getManyProducts, removeProduct } = useProduct();
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [openDelete, setOpenDelete] = useState(false);

//   const fetchProducts = async () => {
//     if (!user?._id) return;
//     setLoading(true);
//     try {
//       const { success, results, nextCursor, hasNextPage, count } = await getManyProducts({ id: user._id }); // Fetch all user products

//       if (success && results.length > 0) {
//         setProducts(results);
//       }
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [user?._id]);

//   const handleDeleteClick = (product) => {
//     setProductToDelete(product);
//     setOpenDelete(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!productToDelete) return;
//     const ok = await removeProduct({
//       userId: user._id,
//       productId: productToDelete._id,
//     });

//     if (ok) {
//       setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
//       setOpenDelete(false);
//     }
//   };

//   if (authLoading || loading) {
//     return (
//       <div className='flex h-[400px] items-center justify-center'>
//         <Loader2 className='h-8 w-8 animate-spin text-primary' />
//       </div>
//     );
//   }

//   return (
//     <div className='w-full space-y-6'>
//       <div className='flex items-center justify-between'>
//         <div>
//           <h2 className='text-3xl font-bold tracking-tight'>My Products</h2>
//           <p className='text-muted-foreground'>Manage your product listings and inventory.</p>
//         </div>
//         <Button asChild>
//           <Link to='/dashboard/create-product'>
//             <Plus className='mr-2 h-4 w-4' /> Add Product
//           </Link>
//         </Button>
//       </div>

//       <Card>
//         <CardContent className='p-0'>
//           <Table>
//             <TableCaption>A list of your recent products.</TableCaption>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className='w-[100px]'>Image</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Tag</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead className='text-right'>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {products.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} className='h-24 text-center'>
//                     No products found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 products.map((product) => (
//                   <TableRow key={product._id}>
//                     <TableCell>
//                       <img src={product.images?.[0]?.secure_url || 'https://placehold.co/50'} alt={product.title} className='aspect-square rounded-md object-cover h-12 w-12' />
//                     </TableCell>
//                     <TableCell className='font-medium'>{product.title}</TableCell>
//                     <TableCell>{typeof product.category === 'object' ? product.category.name : product.category}</TableCell>
//                     <TableCell>{typeof product.tag === 'object' ? product.tag.name : product.tag}</TableCell>
//                     <TableCell>₦{Number(product.price).toLocaleString()}</TableCell>
//                     <TableCell className='text-right'>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant='ghost' className='h-8 w-8 p-0'>
//                             <span className='sr-only'>Open menu</span>
//                             <MoreHorizontal className='h-4 w-4' />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align='end'>
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}>
//                             <Edit className='mr-2 h-4 w-4' /> Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem onClick={() => handleDeleteClick(product)} className='text-destructive focus:text-destructive'>
//                             <Trash2 className='mr-2 h-4 w-4' /> Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//       <ConfirmDeletePopUp name={productToDelete?.title} open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={handleConfirmDelete} type='product' />
//     </div>
//   );
// }
