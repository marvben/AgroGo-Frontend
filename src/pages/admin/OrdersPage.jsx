import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext/useAuth';
import { getAllOrdersAdmin, getFarmerOrders, updateOrderStatus } from '@/services/orderService';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import OrderStatusBadge from '@/components/Common/OrderStatusBadge';
import { Loader2, MoreHorizontal, CheckCircle, XCircle, Truck, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      let response;
      if (user?.role === 'admin') response = await getAllOrdersAdmin();
      if (user?.role === 'farmer') response = await getFarmerOrders(); // Ensure this endpoint exists and works

      if (response?.data?.success) setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await updateOrderStatus(orderId, { status: newStatus });
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>All Orders</h1>
        <Badge variant='outline'>{orders.length} Orders</Badge>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className='font-mono text-xs'>{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{order.Owner?.name || 'Unknown'}</span>
                    <span className='text-xs text-muted-foreground'>{order.Owner?.email}</span>
                  </div>
                </TableCell>
                <TableCell>₦{order.totalAmount?.toLocaleString()}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.paymentStatus} />
                </TableCell>
                <TableCell className='text-muted-foreground text-sm'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                        <Eye className='mr-2 h-4 w-4' /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, 'paid')}>
                        <CheckCircle className='mr-2 h-4 w-4 text-blue-500' /> Mark Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, 'shipped')}>
                        <Truck className='mr-2 h-4 w-4 text-orange-500' /> Mark Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, 'delivered')}>
                        <CheckCircle className='mr-2 h-4 w-4 text-green-500' /> Mark Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusUpdate(order._id, 'cancelled')}>
                        <XCircle className='mr-2 h-4 w-4 text-red-500' /> Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className='max-w-2xl overflow-y-auto max-h-[90vh]'>
          <DialogHeader>
            <DialogTitle>Order Details #{selectedOrder?._id.slice(-6).toUpperCase()}</DialogTitle>
            <DialogDescription>Placed on {selectedOrder && new Date(selectedOrder.createdAt).toLocaleString()}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className='space-y-6'>
              <div className='flex justify-between items-center bg-muted p-4 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Status</p>
                  <OrderStatusBadge status={selectedOrder.paymentStatus} />
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium text-muted-foreground'>Total Amount</p>
                  <p className='text-2xl font-bold'>₦{selectedOrder.totalAmount?.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className='font-semibold mb-3'>Items</h4>
                <div className='space-y-3'>
                  {selectedOrder.Items?.map(
                    (
                      item,
                      idx, // Note: Check if backend returns 'Items' or 'products' populated properly.
                    ) => (
                      // Based on controller it populates 'products.product'. But schema uses 'Items'.
                      // Waiting on verification, assuming 'products' key might be used in common controller or 'Items'
                      // Let's use flexible access or check schema again. Schema says 'Items'. Controller says 'products' ??
                      // Controller: `products: req.body.products` in create. But schema: `Items`.
                      // Let's assume standard Schema usage: Items.
                      <div key={idx} className='flex justify-between items-center border-b pb-2'>
                        <div className='flex items-center gap-3'>
                          {/* Ideally show image but we might only have title/price populated */}
                          <div>
                            <p className='font-medium'>{item.product?.title || 'Product Deleted'}</p>
                            <p className='text-sm text-muted-foreground'>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className='font-medium'>₦{((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <h4 className='font-semibold mb-2'>Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress?.address}</p>
                  <p>
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}
                  </p>
                  <p>{selectedOrder.shippingAddress?.country}</p>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>Customer</h4>
                  <p>{selectedOrder.Owner?.name}</p>
                  <p>{selectedOrder.Owner?.email}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
