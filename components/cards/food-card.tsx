'use client';

import Link from 'next/link';
import { Star, Plus, Minus, Leaf, Drumstick } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

interface FoodCardProps {
  item: MenuItem & { restaurantName?: string; restaurantId?: string };
  restaurantId?: string;
  restaurantName?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export function FoodCard({
  item,
  restaurantId,
  restaurantName,
  className,
  variant = 'default',
}: FoodCardProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [added, setAdded] = useState(false);

  const restId = restaurantId || item.restaurantId || '1';
  const restName = restaurantName || item.restaurantName || 'Restaurant';

  const cartItem = items.find((i) => i.id === item.id && i.restaurantId === restId);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(item, restId, restName, 1);
    setAdded(true);
    toast.success(`${item.name} added to cart`);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      <Link href={`/food/${item.id}`} className="relative block overflow-hidden">
        <div className={cn('relative overflow-hidden', variant === 'compact' ? 'h-32' : 'h-44')}>
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-2 top-2 flex items-center gap-1">
            {item.type === 'veg' ? (
              <span className="flex h-5 w-5 items-center justify-center rounded border-2 border-success bg-white">
                <Leaf className="h-3 w-3 text-success" />
              </span>
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded border-2 border-destructive bg-white">
                <Drumstick className="h-3 w-3 text-destructive" />
              </span>
            )}
          </div>
          {item.originalPrice && (
            <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-lg">
              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
            </div>
          )}
          {item.isBestSeller && (
            <div className="absolute bottom-2 left-2 rounded-full bg-warning/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
              Bestseller
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={`/food/${item.id}`}>
          <h3 className="font-display text-sm font-semibold leading-tight line-clamp-1 hover:text-primary">
            {item.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
          {item.restaurantName || restName}
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-0.5 rounded-md bg-success/10 px-1.5 py-0.5 font-semibold text-success">
            <Star className="h-3 w-3 fill-success" />
            {item.rating}
          </div>
          <span className="text-muted-foreground">({item.ratingCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold">{formatPrice(item.price)}</span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={cn(
                'flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary-dark active:scale-95',
                added && 'animate-bounce-in'
              )}
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/5 px-1 py-0.5">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[20px] text-center text-sm font-bold text-primary">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
