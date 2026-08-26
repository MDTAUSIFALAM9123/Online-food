'use client';

import Link from 'next/link';
import { Check, Clock3, MapPin, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';

export default function OrderSuccessPage() {
  const { total, clearCart } = useCart();
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center lg:px-8">
      <div className="mx-auto flex h-24 w-24 animate-bounce-in items-center justify-center rounded-full bg-success/10"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white"><Check className="h-8 w-8" /></div></div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-success">Order confirmed</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Your food is on the way</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">Thanks for ordering with FoodGo. We&apos;ll keep you updated every step of the way.</p>
      <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6 text-left shadow-sm"><div className="grid gap-5 sm:grid-cols-3"><div className="flex items-start gap-3"><PackageCheck className="h-5 w-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">Order ID</p><p className="mt-1 font-semibold">ORD-2026-005</p></div></div><div className="flex items-start gap-3"><Clock3 className="h-5 w-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">Estimated delivery</p><p className="mt-1 font-semibold">25–35 minutes</p></div></div><div className="flex items-start gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">Delivering to</p><p className="mt-1 font-semibold">Home, Kolkata</p></div></div></div><div className="mt-6 flex items-center justify-between border-t border-border pt-5"><span className="text-muted-foreground">Total paid</span><span className="font-display text-xl font-bold">{formatPrice(total || 787)}</span></div></div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href="/orders/ORD-2026-005/track"><Button size="lg" className="w-full sm:w-auto">Track Order</Button></Link><Link href="/orders/ORD-2026-005"><Button size="lg" variant="outline" className="w-full sm:w-auto">View Order</Button></Link><Link href="/" onClick={() => clearCart()}><Button size="lg" variant="ghost" className="w-full sm:w-auto">Continue Shopping</Button></Link></div>
    </div>
  );
}
