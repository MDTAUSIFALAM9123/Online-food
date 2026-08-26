'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Heart,
  Package,
  Bell,
  Store,
  LayoutDashboard,
  Bike,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/offers', label: 'Offers' },
  { href: '/orders', label: 'Orders' },
  { href: '/help', label: 'Help' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [location, setLocation] = useState('Kolkata, India');

  const isPanelPage =
    pathname.startsWith('/vendor') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/delivery');

  if (isPanelPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-left">FoodGo</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent',
                    pathname === link.href && 'bg-primary/10 text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <Link href="/vendor" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                <Store className="h-4 w-4" /> Restaurant Panel
              </Link>
              <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                <LayoutDashboard className="h-4 w-4" /> Admin Panel
              </Link>
              <Link href="/delivery" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                <Bike className="h-4 w-4" /> Delivery Partner
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="font-display text-lg font-bold">F</span>
          </div>
          <span className="hidden font-display text-xl font-bold tracking-tight sm:block">
            Food<span className="text-primary">Go</span>
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hidden items-center gap-1.5 text-sm md:flex">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Deliver to</span>
              <span className="max-w-[120px] truncate text-muted-foreground">{location}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Select your city</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['Kolkata, India', 'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India'].map((city) => (
              <DropdownMenuItem key={city} onClick={() => setLocation(city)}>
                <MapPin className="mr-2 h-4 w-4" /> {city}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden flex-1 items-center md:flex">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search restaurants, dishes or cuisines..."
              className="h-10 rounded-full border-border/60 bg-muted/40 pl-10 pr-4"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link href="/orders" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Package className="h-4 w-4" /> Orders
            </Button>
          </Link>
          <Link href="/favorites" className="hidden sm:block">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/notifications" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders"><Package className="mr-2 h-4 w-4" /> My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/favorites"><Heart className="mr-2 h-4 w-4" /> Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/addresses"><MapPin className="mr-2 h-4 w-4" /> Addresses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/payments"><ShoppingCart className="mr-2 h-4 w-4" /> Payments</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/vendor"><Store className="mr-2 h-4 w-4" /> Restaurant Panel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" /> Admin Panel</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/delivery"><Bike className="mr-2 h-4 w-4" /> Delivery Partner</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="text-primary">Sign In / Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-t border-border/40 px-4 py-2.5 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, dishes..."
            className="h-9 rounded-full border-border/60 bg-muted/40 pl-10 pr-4"
          />
        </div>
      </div>
    </header>
  );
}
