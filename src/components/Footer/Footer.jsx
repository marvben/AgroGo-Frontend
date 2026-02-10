import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Footer() {
  return (
    <footer className='bg-muted/30 border-t border-border mt-auto'>
      <div className='container py-12 px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand Column */}
          <div className='space-y-4'>
            <Link to='/' className='flex items-center gap-2 font-bold text-xl tracking-tight'>
              <span className='text-primary text-2xl'>Agro</span>
              <span className='text-foreground'>Go</span>
            </Link>
            <p className='text-muted-foreground text-sm leading-relaxed'>Empowering farmers and connecting buyers directly. The most trusted marketplace for fresh, quality produce.</p>
            <div className='flex gap-4'>
              <a href='#' className='text-muted-foreground hover:text-primary transition-colors'>
                <Facebook className='h-5 w-5' />
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary transition-colors'>
                <Twitter className='h-5 w-5' />
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary transition-colors'>
                <Instagram className='h-5 w-5' />
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary transition-colors'>
                <Linkedin className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Quick Links</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/about' className='hover:text-primary transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/products' className='hover:text-primary transition-colors'>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to='/contact' className='hover:text-primary transition-colors'>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to='/terms' className='hover:text-primary transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='hover:text-primary transition-colors'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Contact Us</h3>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-primary shrink-0' />
                <span>
                  123 AgriLane, Farming District,
                  <br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-primary shrink-0' />
                <span>+254 700 123 456</span>
              </li>
              <li className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-primary shrink-0' />
                <span>support@agrogo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Newsletter</h3>
            <p className='text-muted-foreground text-sm'>Subscribe to get the latest market prices and updates.</p>
            <form className='flex flex-col gap-2' onSubmit={(e) => e.preventDefault()}>
              <Input placeholder='Enter your email' type='email' className='bg-background' />
              <Button type='submit' className='w-full'>
                Subscribe <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </form>
          </div>
        </div>

        <div className='border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} AgroGo Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
