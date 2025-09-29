import {
  Box,
  LinearProgress,
  Stack,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  TableSortLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDeletePopUp from '../../../components/ConfirmDeletePopUp/ConfirmDeletePopUp';
import { useState, useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { useAuth } from '../../../context/AuthContext/useAuth';

export default function ProductTable() {
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

  const handleDelete = (p) => {
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
      const newProductList = products.filter(
        (product) => productToDeleteID != product._id
      );
      setCount((...count) => count - 1);
      setLimit((...limit) => limit);
      setProducts(newProductList);
    }
  };

  const fetchProducts = async (params) => {
    try {
      const { results, count, hasNextPage, nextCursor } = await getManyProducts(
        params
      );

      if (!results) {
        setProducts([]);
        setCount(0);
        return;
      }

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
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ mb: 4, maxHeight: '80vh' }}
        >
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
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
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
                <TableRow key={p?._id} hover>
                  <TableCell>{p?.title}</TableCell>
                  <TableCell>
                    {new Date(p?.createdAt).toLocaleString()}
                  </TableCell>
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
                    <IconButton color='primary' size='small'>
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      color='error'
                      size='small'
                      onClick={() => handleDelete(p)}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
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
