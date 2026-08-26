'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { Check, ChevronRight, Drumstick, Leaf, Minus, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getMenuItem, formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const result = getMenuItem(params.id);
  if (!result) notFound();
  const { item, restaurant } = result;
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState('Regular');
  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const sizes = [
    { label: 'Regular', price: 0 },
    { label: 'Large', price: 50 },
    { label: 'Extra Large', price: 100 },
  ];
  const extraOptions = [
    { label: 'Extra Cheese', price: 35 },
    { label: 'Extra Sauce', price: 20 },
    { label: 'Extra Chicken', price: 70 },
    { label: 'Extra Vegetables', price: 30 },
  ];
  const extraTotal = extras.reduce((sum, extra) => sum + (extraOptions.find((option) => option.label === extra)?.price ?? 0), 0);
  const sizeTotal = sizes.find((option) => option.label === size)?.price ?? 0;
  const unitPrice = item.price + sizeTotal + extraTotal;
  const total = unitPrice * quantity;

  const toggleExtra = (label: string) => {
    setExtras((current) => current.includes(label) ? current.filter((extra) => extra !== label) : [...current, label]);
  };

  const handleAdd = () => {
    addItem(item, restaurant.id, restaurant.name, quantity);
    toast.success(`${item.name} added to cart`);
    router.push('/cart');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={() => router.back()} className="hover:text-primary">Menu</button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{item.name}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
            <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <p className="text-sm text-muted-foreground">From</p>
            <div className="mt-2 flex items-center gap-3">
              <img src={restaurant.logo} alt={restaurant.name} className="h-10 w-10 rounded-xl object-cover" />
              <div>
                <p className="font-display font-semibold">{restaurant.name}</p>
                <p className="text-xs text-muted-foreground">{restaurant.cuisines.join(' • ')}</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto" onClick={() => router.push(`/restaurant/${restaurant.slug}`)}>View menu</Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className={cn('flex h-5 w-5 items-center justify-center rounded border-2 bg-white', item.type === 'veg' ? 'border-success' : 'border-destructive')}>
                  {item.type === 'veg' ? <Leaf className="h-3 w-3 text-success" /> : <Drumstick className="h-3 w-3 text-destructive" />}
                </span>
                <span className="text-sm font-medium capitalize">{item.type}</span>
              </div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{item.name}</h1>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-success/10 px-2 py-1 text-sm font-semibold text-success">
              <Star className="h-4 w-4 fill-success" /> {item.rating}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-2xl font-bold">{formatPrice(unitPrice)}</span>
            {item.originalPrice && <span className="text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>}
            {item.originalPrice && <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">Special price</span>}
          </div>

          <div className="mt-7 border-t border-border/60 pt-6">
            <h2 className="font-display text-lg font-semibold">Choose a size</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {sizes.map((option) => (
                <button key={option.label} onClick={() => setSize(option.label)} className={cn('rounded-xl border p-3 text-left transition-colors', size === option.label ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent')}>
                  <span className="block text-sm font-medium">{option.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{option.price ? `+${formatPrice(option.price)}` : 'Included'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold">Add extras</h2>
            <div className="mt-3 space-y-2">
              {extraOptions.map((option) => (
                <button key={option.label} onClick={() => toggleExtra(option.label)} className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left transition-colors hover:bg-accent">
                  <span className="flex items-center gap-3 text-sm"><span className={cn('flex h-5 w-5 items-center justify-center rounded border', extras.includes(option.label) ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>{extras.includes(option.label) && <Check className="h-3.5 w-3.5" />}</span>{option.label}</span>
                  <span className="text-sm text-muted-foreground">+{formatPrice(option.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold">Special instructions</h2>
            <Textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Add cooking instructions..." className="mt-3 min-h-24" />
          </div>

          <div className="mt-6 flex gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border px-2">
              <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="flex h-10 w-8 items-center justify-center text-muted-foreground hover:text-primary"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((current) => current + 1)} className="flex h-10 w-8 items-center justify-center text-muted-foreground hover:text-primary"><Plus className="h-4 w-4" /></button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAdd}>Add to Cart — {formatPrice(total)}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
