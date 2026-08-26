'use client';

import { useState } from 'react';
import { Copy, Tag, Check, TicketPercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { coupons } from '@/lib/data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const filters = ['All Offers', 'Restaurant Offers', 'Food Offers', 'Free Delivery', 'Bank Offers', 'Coupon Offers'];
export default function OffersPage() {
  const [active, setActive] = useState('All Offers');
  const [copied, setCopied] = useState<string | null>(null);
  const copyCode = (code: string) => { navigator.clipboard?.writeText(code); setCopied(code); toast.success(`${code} copied`); setTimeout(() => setCopied(null), 1400); };
  const visible = active === 'All Offers' ? coupons : coupons.filter((coupon) => ({ 'Restaurant Offers': 'restaurant', 'Food Offers': 'food', 'Free Delivery': 'free-delivery', 'Bank Offers': 'bank', 'Coupon Offers': 'coupon' } as Record<string, string>)[active] === coupon.category);
  return <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Save more, eat better</p><h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Offers & deals</h1><p className="mt-2 text-muted-foreground">Fresh discounts for your next delicious order.</p></div><TicketPercent className="hidden h-16 w-16 text-primary/20 sm:block" /></div><div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">{filters.map((filter) => <button key={filter} onClick={() => setActive(filter)} className={cn('shrink-0 rounded-full border px-4 py-2 text-sm font-medium', active === filter ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-accent')}>{filter}</button>)}</div><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((coupon) => <div key={coupon.id} className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-lg"><div className={`relative bg-gradient-to-br ${coupon.color} p-6 text-white`}><Tag className="absolute -right-4 -top-4 h-24 w-24 opacity-10" /><p className="text-sm font-semibold text-white/75">LIMITED TIME OFFER</p><h2 className="mt-2 font-display text-2xl font-bold">{coupon.title}</h2><p className="mt-2 text-sm text-white/80">{coupon.description}</p></div><div className="p-5"><div className="flex items-center justify-between rounded-xl border border-dashed border-primary/50 bg-primary/5 px-4 py-3"><div><p className="text-xs text-muted-foreground">Use code</p><p className="font-display font-bold text-primary">{coupon.code}</p></div><Button variant="outline" size="sm" onClick={() => copyCode(coupon.code)}>{copied === coupon.code ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}{copied === coupon.code ? 'Copied' : 'Copy'}</Button></div><div className="mt-4 flex items-center justify-between text-xs text-muted-foreground"><span>{coupon.validity}</span><span>Max {coupon.maxDiscount ? `₹${coupon.maxDiscount}` : 'none'}</span></div><Button className="mt-4 w-full" onClick={() => copyCode(coupon.code)}>Apply Coupon</Button></div></div>)}</div></div>;
}
