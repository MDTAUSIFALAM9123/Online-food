'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Trash2, ShoppingBag, Tag, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/cart-context';
import { coupons, formatPrice } from '@/lib/data';
import { toast } from 'sonner';
import { EmptyState } from '@/components/shared/empty-state';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, deliveryFee, packagingFee, taxes, platformFee, discount, total, appliedCoupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    const coupon = coupons.find((c) => c.code.toLowerCase() === couponInput.toLowerCase());
    if (!coupon) {
      toast.error('Invalid coupon code');
      return;
    }
    if (subtotal < coupon.minOrder) {
      toast.error(`Minimum order of ${formatPrice(coupon.minOrder)} required`);
      return;
    }
    const disc = coupon.discountType === 'percent'
      ? Math.round((subtotal * parseInt(coupon.discount)) / 100)
      : coupon.maxDiscount;
    applyCoupon(coupon.code, Math.min(disc, coupon.maxDiscount));
    toast.success(`Coupon ${coupon.code} applied!`);
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <EmptyState
          icon={<ShoppingBag className="h-12 w-12" />}
          title="Your cart is empty"
          description="Looks like your cart is waiting for some delicious food."
          actionLabel="Explore Restaurants"
          actionHref="/restaurants"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>
      <p className="mt-1 text-muted-foreground">{items.length} item(s) from {items[0].restaurantName}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                <p className="mt-1 font-semibold">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/5 px-1 py-0.5">
                <button onClick={() => updateQuantity(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-md text-primary hover:bg-primary/10">−</button>
                <span className="min-w-[24px] text-center font-bold text-primary">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-md text-primary hover:bg-primary/10">+</button>
              </div>
              <p className="w-16 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            className="text-sm text-muted-foreground hover:text-destructive"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-display font-semibold">Apply Coupon</h3>
            {appliedCoupon ? (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-success/10 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{appliedCoupon} applied</span>
                </div>
                <button onClick={removeCoupon} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="h-10"
                />
                <Button onClick={handleApplyCoupon} variant="outline">Apply</Button>
              </div>
            )}

            <div className="mt-3 space-y-2">
              {coupons.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setCouponInput(c.code); }}
                  className="flex w-full items-center justify-between rounded-lg border border-dashed border-border p-2 text-left text-xs hover:border-primary"
                >
                  <div>
                    <p className="font-bold text-primary">{c.code}</p>
                    <p className="text-muted-foreground">{c.description}</p>
                  </div>
                  <span className="text-primary">{c.discount}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-display font-semibold">Price Details</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span>{formatPrice(deliveryFee)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Packaging Fee</span><span>{formatPrice(packagingFee)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Taxes (5%)</span><span>{formatPrice(taxes)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span>{formatPrice(platformFee)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between font-medium text-success"><span>Discount</span><span>−{formatPrice(discount)}</span></div>
              )}
              <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="mt-4 w-full" size="lg">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
