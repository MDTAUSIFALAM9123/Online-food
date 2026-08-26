'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, ChevronLeft, CreditCard, MapPin, Plus, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/cart-context';
import { addresses, formatPrice } from '@/lib/data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const steps = ['Address', 'Instructions', 'Payment', 'Review'];
const paymentMethods = [
  { id: 'upi', label: 'UPI', description: 'Pay using any UPI app', icon: WalletCards },
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', description: 'All major banks supported', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your food arrives', icon: WalletCards },
];

export default function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [instruction, setInstruction] = useState('Meet at door');
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState('upi');

  if (cart.items.length === 0) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center"><h1 className="font-display text-2xl font-bold">Your cart is empty</h1><Link href="/restaurants" className="mt-4 inline-block"><Button>Explore Restaurants</Button></Link></div>;
  }

  const selected = addresses.find((address) => address.id === selectedAddress) ?? addresses[0];
  const nextStep = () => setStep((current) => Math.min(3, current + 1));
  const placeOrder = () => { toast.success('Order placed successfully'); window.location.href = '/order-success'; };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8">
      <div className="flex items-center gap-3"><Link href="/cart" className="text-muted-foreground hover:text-primary"><ChevronLeft className="h-5 w-5" /></Link><h1 className="font-display text-3xl font-bold">Checkout</h1></div>
      <div className="mt-8 flex items-center justify-between">
        {steps.map((label, index) => <div key={label} className="flex flex-1 items-center last:flex-none"><div className="flex flex-col items-center gap-2"><div className={cn('flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold', index <= step ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground')}>{index < step ? <Check className="h-4 w-4" /> : index + 1}</div><span className={cn('hidden text-xs font-medium sm:block', index <= step ? 'text-primary' : 'text-muted-foreground')}>{label}</span></div>{index < steps.length - 1 && <div className={cn('mx-2 h-px flex-1', index < step ? 'bg-primary' : 'bg-border')} />}</div>)}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
          {step === 0 && <div><div className="flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold">Delivery address</h2><p className="mt-1 text-sm text-muted-foreground">Where should we deliver your order?</p></div><Button variant="outline" size="sm"><Plus className="mr-1 h-4 w-4" /> Add New</Button></div><div className="mt-5 space-y-3">{addresses.map((address) => <button key={address.id} onClick={() => setSelectedAddress(address.id)} className={cn('flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors', selectedAddress === address.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent')}><span className={cn('mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border', selectedAddress === address.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>{selectedAddress === address.id && <Check className="h-3 w-3" />}</span><span><span className="flex items-center gap-2 font-semibold">{address.label}{address.isDefault && <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">DEFAULT</span>}</span><span className="mt-1 block text-sm text-muted-foreground">{address.address}, {address.landmark}, {address.city} - {address.pincode}</span><span className="mt-1 block text-xs text-muted-foreground">{address.name} • {address.phone}</span></span></button>)}</div></div>}
          {step === 1 && <div><h2 className="font-display text-xl font-semibold">Delivery instructions</h2><p className="mt-1 text-sm text-muted-foreground">Help your delivery partner find you easily.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{['Leave at door', 'Meet at door', 'Call on arrival'].map((option) => <button key={option} onClick={() => setInstruction(option)} className={cn('rounded-xl border p-3 text-sm font-medium', instruction === option ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent')}>{option}</button>)}</div><label className="mt-6 block text-sm font-medium">Additional notes</label><Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="e.g. Ring the bell twice" className="mt-2" /></div>}
          {step === 2 && <div><h2 className="font-display text-xl font-semibold">Choose payment method</h2><p className="mt-1 text-sm text-muted-foreground">Secure payments powered by FoodGo.</p><div className="mt-5 space-y-3">{paymentMethods.map((method) => { const Icon = method.icon; return <button key={method.id} onClick={() => setPayment(method.id)} className={cn('flex w-full items-center gap-3 rounded-xl border p-4 text-left', payment === method.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent')}><span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', payment === method.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}><Icon className="h-5 w-5" /></span><span className="flex-1"><span className="block font-semibold">{method.label}</span><span className="text-xs text-muted-foreground">{method.description}</span></span><span className={cn('h-5 w-5 rounded-full border-4', payment === method.id ? 'border-primary' : 'border-border')} /></button>; })}</div>{payment === 'upi' && <div className="mt-4 rounded-xl bg-muted/60 p-4"><p className="text-sm font-medium">Saved UPI ID</p><p className="mt-1 text-sm text-muted-foreground">arjun.mehta@oksbi</p></div>}</div>}
          {step === 3 && <div><h2 className="font-display text-xl font-semibold">Review your order</h2><div className="mt-5 space-y-4"><div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4"><MapPin className="mt-0.5 h-5 w-5 text-primary" /><div><p className="font-semibold">{selected.label}</p><p className="mt-1 text-sm text-muted-foreground">{selected.address}, {selected.city} - {selected.pincode}</p></div></div><div className="rounded-xl border border-border p-4"><p className="font-semibold">{cart.items[0].restaurantName}</p>{cart.items.map((item) => <div key={item.id} className="mt-3 flex justify-between text-sm"><span>{item.quantity} × {item.name}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}</div><div className="rounded-xl border border-border p-4"><p className="font-semibold">Payment</p><p className="mt-1 text-sm text-muted-foreground">{paymentMethods.find((method) => method.id === payment)?.label}</p></div></div></div>}
          <div className="mt-8 flex justify-between border-t border-border pt-5">{step > 0 ? <Button variant="outline" onClick={() => setStep((current) => current - 1)}>Back</Button> : <span />}{step < 3 ? <Button onClick={nextStep}>Continue</Button> : <Button onClick={placeOrder}>Place Order — {formatPrice(cart.total)}</Button>}</div>
        </div>

        <div className="h-fit rounded-2xl border border-border/60 bg-card p-5"><h3 className="font-display font-semibold">Order summary</h3><div className="mt-4 space-y-3 text-sm">{cart.items.map((item) => <div key={item.id} className="flex justify-between gap-3"><span className="text-muted-foreground">{item.quantity} × {item.name}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}<div className="border-t border-border pt-3"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div><div className="mt-2 flex justify-between"><span className="text-muted-foreground">Delivery & fees</span><span>{formatPrice(cart.deliveryFee + cart.packagingFee + cart.taxes + cart.platformFee)}</span></div>{cart.discount > 0 && <div className="mt-2 flex justify-between text-success"><span>Discount</span><span>−{formatPrice(cart.discount)}</span></div>}<div className="mt-3 flex justify-between text-base font-bold"><span>Total</span><span>{formatPrice(cart.total)}</span></div></div></div></div>
      </div>
    </div>
  );
}
