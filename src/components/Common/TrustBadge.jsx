import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle2, ShieldCheck, Shield } from 'lucide-react';

export default function TrustBadge({ type, showLabel = true, size = 'default' }) {
  const getConfig = () => {
    switch (type) {
      case 'verified-farmer':
        return {
          icon: <CheckCircle2 className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          label: 'Verified Farmer',
          className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20',
          tooltip: 'Identity verified by AgroGo Platform',
        };
      case 'secure-payment':
        return {
          icon: <ShieldCheck className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          label: 'Secure Payment',
          className: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20',
          tooltip: 'Payments are held securely by AgroGo until delivery',
        };
      case 'platform-protection':
        return {
          icon: <Shield className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          label: 'Platform Protection',
          className: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20',
          tooltip: 'This transaction is protected by AgroGo Guarantee',
        };
      default:
        return {
          icon: <CheckCircle2 className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          label: 'Verified',
          className: 'bg-slate-800 text-slate-300 border-slate-700',
          tooltip: 'Verified',
        };
    }
  };

  const config = getConfig();

  const BadgeComponent = (
    <Badge variant='outline' className={`gap-1.5 font-semibold ${config.className} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1'}`}>
      {config.icon}
      {showLabel && <span>{config.label}</span>}
    </Badge>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{showLabel ? BadgeComponent : <div className={`inline-flex items-center justify-center p-1 rounded-full ${config.className}`}>{config.icon}</div>}</TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
