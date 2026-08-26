'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Package, Heart, User } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurants', label: 'Explore', icon: Compass },
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isPanelPage =
    pathname.startsWith('/vendor') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/delivery');

  if (isPanelPage) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon className={cn('h-5 w-5', isActive && 'fill-primary/10')} />
                {item.href === '/orders' && totalItems > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-primary px-1 text-[8px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
