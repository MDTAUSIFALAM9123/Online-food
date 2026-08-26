'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import {
  Star,
  Clock,
  Bike,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  ChevronDown,
  Leaf,
  Drumstick,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FoodCard } from '@/components/cards/food-card';
import { ReviewCard } from '@/components/cards/review-card';
import { restaurants, reviews, formatPrice, type Restaurant } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function RestaurantDetailPage({ params }: { params: { slug: string } }) {
  const restaurant = restaurants.find((r) => r.slug === params.slug);
  if (!restaurant) notFound();

  const [fav, setFav] = useState(restaurant.isFavorite);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map((m) => m.category)))];

  const filteredMenu = useMemo(() => {
    let items = restaurant.menu;
    if (activeCategory !== 'All') items = items.filter((m) => m.category === activeCategory);
    if (search) items = items.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
    return items;
  }, [restaurant, activeCategory, search]);

  const ratingBreakdown = [
    { stars: 5, percent: 68 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  return (
    <div>
      {/* Cover */}
      <div className="relative h-48 overflow-hidden sm:h-64 lg:h-80">
        <img src={restaurant.coverImage} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header Card */}
        <div className="relative -mt-16 rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:-mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="h-16 w-16 rounded-2xl border-2 border-border object-cover sm:h-20 sm:w-20"
              />
              <div>
                <h1 className="font-display text-2xl font-bold sm:text-3xl">{restaurant.name}</h1>
                <p className="mt-1 text-muted-foreground">{restaurant.cuisines.join(' • ')}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2 py-1 font-semibold text-success">
                    <Star className="h-4 w-4 fill-success" /> {restaurant.rating}
                    <span className="text-muted-foreground">({restaurant.ratingCount.toLocaleString('en-IN')})</span>
                  </div>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" /> {restaurant.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Bike className="h-4 w-4" /> {formatPrice(restaurant.deliveryFee)} delivery
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {restaurant.distance}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setFav(!fav);
                  toast.success(fav ? 'Removed from favorites' : 'Added to favorites');
                }}
              >
                <Heart className={cn('h-5 w-5', fav && 'fill-primary text-primary')} />
              </Button>
              <Button variant="outline" size="icon" onClick={() => toast.success('Link copied to clipboard')}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {restaurant.offer && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2.5">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                OFFER
              </span>
              <span className="text-sm font-medium text-primary">{restaurant.offer}</span>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="font-display font-semibold">Restaurant Info</h3>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {restaurant.address}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /> {restaurant.openingHours}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> {restaurant.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> {restaurant.email}</p>
              </div>
              <div className="mt-3 rounded-xl bg-muted/50 p-3 text-sm">
                <p className="font-medium">Minimum Order: {formatPrice(restaurant.minOrder)}</p>
                <p className="mt-1 text-muted-foreground">{restaurant.description}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h3 className="font-display font-semibold">Rating Breakdown</h3>
              <div className="mt-3 space-y-2">
                {ratingBreakdown.map((rb) => (
                  <div key={rb.stars} className="flex items-center gap-2 text-sm">
                    <span className="flex w-12 items-center gap-0.5">
                      {rb.stars} <Star className="h-3 w-3 fill-success text-success" />
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-success" style={{ width: `${rb.percent}%` }} />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{rb.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu */}
          <div>
            <Tabs defaultValue="menu">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="mt-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search menu items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 rounded-full pl-10"
                  />
                </div>

                <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                        activeCategory === cat
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card hover:bg-accent'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredMenu.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.name}
                    />
                  ))}
                </div>

                {filteredMenu.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No items found matching your search.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="mb-4 flex items-center gap-6 rounded-2xl border border-border/60 bg-card p-5">
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-success">{restaurant.rating}</p>
                    <p className="text-sm text-muted-foreground">{restaurant.ratingCount.toLocaleString('en-IN')} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {ratingBreakdown.map((rb) => (
                      <div key={rb.stars} className="flex items-center gap-2 text-sm">
                        <span className="w-8">{rb.stars}★</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-success" style={{ width: `${rb.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <div className="rounded-2xl border border-border/60 bg-card p-5">
                  <h3 className="font-display font-semibold">About {restaurant.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{restaurant.description}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {restaurant.address}</p>
                    <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {restaurant.openingHours}</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {restaurant.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {restaurant.email}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
