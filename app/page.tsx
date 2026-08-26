'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Star,
  Clock,
  Bike,
  Heart,
  MapPin,
  ArrowRight,
  Tag,
  Timer,
  TrendingUp,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel } from '@/components/ui/carousel-horizontal';
import { RestaurantCard } from '@/components/cards/restaurant-card';
import { FoodCard } from '@/components/cards/food-card';
import {
  categories,
  cuisines,
  restaurants,
  coupons,
  allMenuItems,
  formatPrice,
} from '@/lib/data';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 23, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 10; minutes = 23; seconds = 48; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = allMenuItems.filter((i) => i.isBestSeller).slice(0, 10);
  const trendingItems = allMenuItems.filter((i) => i.isTrending).slice(0, 10);
  const offerItems = allMenuItems.filter((i) => i.originalPrice).slice(0, 6);
  const topRestaurants = restaurants.slice(0, 6);
  const popularRestaurants = [...restaurants].reverse().slice(0, 6);

  return (
    <div className="bg-background">
      {/* Promotional Banner */}
      <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-6 py-4 text-white sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bike className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display font-semibold">Free Delivery</p>
              <p className="text-sm text-white/80">Get free delivery on your first ₹499+ order</p>
            </div>
          </div>
          <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Claim Now
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="animate-slide-up">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Delicious Food
              <br />
              <span className="text-primary">Delivered</span> Near You
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Discover the best restaurants, dishes and offers around you. Order in seconds, track in real-time.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants, dishes or cuisines"
                  className="h-14 rounded-full border-border/60 bg-card pl-12 pr-4 text-base shadow-sm"
                />
              </div>
              <Link href="/restaurants">
                <Button size="lg" className="h-14 rounded-full px-8 text-base">
                  Search
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Delivering to <span className="font-medium text-foreground">Kolkata, India</span>
              <button className="text-primary hover:underline">Change</button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=800&w=800"
                alt="Delicious food"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/90 p-4 backdrop-blur-md shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Star className="h-6 w-6 fill-primary text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold">4.8/5 Rating</p>
                  <p className="text-sm text-muted-foreground">From 12,000+ happy customers</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-8 animate-float rounded-2xl bg-white p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <Bike className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs font-bold">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">25-35 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">What's on your mind?</h2>
        </div>
        <Carousel>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/restaurants?category=${cat.id}`}
              className="group flex flex-col items-center gap-2"
            >
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-border/40 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/30 md:h-24 md:w-24">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
              </div>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </Carousel>
      </section>

      {/* Special Offers */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                SPECIAL OFFER
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">
                Save up to 40% on selected dishes
              </h3>
              <p className="mt-2 text-white/80">Limited time deal — don't miss out!</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
                <Timer className="h-5 w-5" />
                <span className="font-display text-2xl font-bold tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            <Link href="/offers">
              <Button variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90">
                View All Offers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Top Deals</h2>
              <Link href="/offers" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <Carousel>
              {offerItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  restaurantId={item.restaurantId}
                  restaurantName={item.restaurantName}
                  className="w-[200px] shrink-0 sm:w-[240px]"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Top Restaurants */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Top Restaurants Near You</h2>
          <Link href="/restaurants" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Carousel>
          {topRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} className="w-[280px] shrink-0 sm:w-[300px]" />
          ))}
        </Carousel>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Best Sellers</h2>
          <Link href="/restaurants" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Carousel>
          {bestSellers.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              restaurantId={item.restaurantId}
              restaurantName={item.restaurantName}
              className="w-[200px] shrink-0 sm:w-[240px]"
            />
          ))}
        </Carousel>
      </section>

      {/* Popular Near You */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Popular Near You</h2>
          <Link href="/restaurants" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* Trending This Week */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold">Trending This Week</h2>
          </div>
          <Link href="/restaurants" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Carousel>
          {trendingItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              restaurantId={item.restaurantId}
              restaurantName={item.restaurantName}
              className="w-[200px] shrink-0 sm:w-[240px]"
            />
          ))}
        </Carousel>
      </section>

      {/* Explore by Cuisine */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h2 className="mb-4 font-display text-2xl font-bold">Explore by Cuisine</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cuisines.map((cuisine) => (
            <Link
              key={cuisine.name}
              href={`/restaurants?cuisine=${cuisine.name}`}
              className="group relative h-32 overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-lg sm:h-36"
            >
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <div className="absolute bottom-3 left-3">
                <h3 className="font-display text-lg font-bold text-white">{cuisine.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Latest Coupons & Offers</h2>
          <Link href="/offers" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coupons.slice(0, 4).map((coupon) => (
            <div
              key={coupon.id}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${coupon.color} p-5 text-white shadow-md`}
            >
              <Tag className="absolute -right-2 -top-2 h-16 w-16 opacity-10" />
              <p className="font-display text-lg font-bold">{coupon.title}</p>
              <p className="mt-1 text-sm text-white/80">{coupon.description}</p>
              <div className="mt-3 inline-block rounded-lg border-2 border-dashed border-white/40 px-3 py-1 text-sm font-bold">
                {coupon.code}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Download CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-secondary to-accent p-8 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Get the FoodGo App
            </h2>
            <p className="mt-2 text-muted-foreground">
              Download our app for exclusive deals, faster ordering and real-time tracking.
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="lg" className="rounded-full px-6">
              App Store
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6">
              Google Play
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
