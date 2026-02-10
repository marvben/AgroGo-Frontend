import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ShareButton({ title, url, className, variant = 'outline', size = 'icon' }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: title || 'AgroGo',
      text: title ? `Check out ${title} on AgroGo!` : 'Check this out on AgroGo!',
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('transition-all duration-300', copied ? 'bg-green-500/10 text-green-600 border-green-500/20' : '', className)}
      onClick={handleShare}
      title='Share'
      type='button'
    >
      {copied ? <Check className='h-4 w-4' /> : <Share2 className='h-4 w-4' />}
      <span className='sr-only'>Share</span>
    </Button>
  );
}
