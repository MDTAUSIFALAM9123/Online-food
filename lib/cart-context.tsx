'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { MenuItem } from '@/lib/data';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  customizations?: string[];
  instructions?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  taxes: number;
  platformFee: number;
  discount: number;
  total: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const restaurantId = items.length > 0 ? items[0].restaurantId : null;

  const addItem = useCallback(
    (item: MenuItem, restId: string, restName: string, quantity = 1) => {
      setItems((prev) => {
        if (prev.length > 0 && prev[0].restaurantId !== restId) {
          return [
            {
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              restaurantId: restId,
              restaurantName: restName,
              quantity,
            },
          ];
        }
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            restaurantId: restId,
            restaurantName: restName,
            quantity,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  }, []);

  const applyCoupon = useCallback((code: string, discount: number) => {
    setAppliedCoupon(code);
    setCouponDiscount(discount);
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const deliveryFee = useMemo(() => (subtotal > 0 ? 30 : 0), [subtotal]);
  const packagingFee = useMemo(() => (subtotal > 0 ? 15 : 0), [subtotal]);
  const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const platformFee = useMemo(() => (subtotal > 0 ? 5 : 0), [subtotal]);
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.min(couponDiscount, subtotal);
  }, [appliedCoupon, couponDiscount, subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal + deliveryFee + packagingFee + taxes + platformFee - discount),
    [subtotal, deliveryFee, packagingFee, taxes, platformFee, discount]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    packagingFee,
    taxes,
    platformFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    restaurantId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
