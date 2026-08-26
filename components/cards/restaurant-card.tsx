'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, Clock, Bike, Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Restaurant } from '@/lib/data';
import { formatPrice } from '@/lib/data';

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const [fav, setFav] = useState(restaurant.isFavorite);

  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {restaurant.offer && (
          <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-lg">
            {restaurant.offer}
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setFav(!fav);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart
            className={cn('h-4 w-4', fav ? 'fill-primary text-primary' : 'text-muted-foreground')}
          />
        </button>

        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-foreground">
              Closed
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="h-10 w-10 rounded-full border-2 border-border object-cover"
            />
            <div>
              <h3 className="font-display text-sm font-semibold leading-tight">{restaurant.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{restaurant.cuisines.join(' • ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 font-semibold text-success">
            <Star className="h-3 w-3 fill-success" />
            {restaurant.rating}
          </div>
          <span className="text-muted-foreground">({restaurant.ratingCount.toLocaleString('en-IN')})</span>
        </div>

        <div className="mt-3 flex items-center gap-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {restaurant.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Bike className="h-3.5 w-3.5" /> {formatPrice(restaurant.deliveryFee)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {restaurant.distance}
          </span>
        </div>
      </div>
    </Link>
  );
}
