import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle2, Truck, Wallet, Ban } from 'lucide-react';

export default function OrderStatusBadge({ status }) {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'paid':
        return {
          label: 'Paid by Buyer (Held by AgroGo)',
          className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          icon: <Wallet className='h-3 w-3 mr-1' />,
          tooltip: 'Money is safe with AgroGo. Please start packing.',
        };
      case 'confirmed':
        return {
          label: 'Confirmed',
          className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          icon: <CheckCircle2 className='h-3 w-3 mr-1' />,
          tooltip: 'Order confirmed. Ready for shipping.',
        };
      case 'shipped':
        return {
          label: 'Shipped',
          className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          icon: <Truck className='h-3 w-3 mr-1' />,
          tooltip: 'Product is on the way.',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          className: 'bg-green-500/10 text-green-500 border-green-500/20',
          icon: <CheckCircle2 className='h-3 w-3 mr-1' />,
          tooltip: 'Product delivered. Payout incoming.',
        };
      case 'completed': // Payout done
        return {
          label: 'Payout Sent',
          className: 'bg-green-500/10 text-green-500 border-green-500/20',
          icon: <CheckCircle2 className='h-3 w-3 mr-1' />,
          tooltip: 'Money has been sent to your bank.',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className: 'bg-destructive/10 text-destructive border-destructive/20',
          icon: <Ban className='h-3 w-3 mr-1' />,
          tooltip: 'Order cancelled.',
        };
      default:
        return {
          label: status,
          className: 'bg-muted text-muted-foreground border-border',
          icon: null,
          tooltip: '',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant='outline' className={`font-semibold ${config.className}`}>
            {config.icon}
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
