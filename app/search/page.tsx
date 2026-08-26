'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RestaurantCard } from '@/components/cards/restaurant-card';
import { FoodCard } from '@/components/cards/food-card';
import { restaurants, allMenuItems } from '@/lib/data';

export default function SearchPage() {
  const [query, setQuery] = useState('Biryani');
  const restaurantResults = useMemo(() => restaurants.filter((restaurant) => `${restaurant.name} ${restaurant.cuisines.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const foodResults = useMemo(() => allMenuItems.filter((item) => `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8"><h1 className="font-display text-3xl font-bold">Search food</h1><div className="relative mt-5 max-w-2xl"><SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search restaurants, dishes or cuisines..." className="h-12 rounded-full pl-11" /></div><p className="mt-5 text-muted-foreground">Search results for <span className="font-semibold text-foreground">&quot;{query}&quot;</span></p><Tabs defaultValue="restaurants" className="mt-5"><TabsList><TabsTrigger value="restaurants">Restaurants ({restaurantResults.length})</TabsTrigger><TabsTrigger value="dishes">Dishes ({foodResults.length})</TabsTrigger><TabsTrigger value="cuisines">Cuisines</TabsTrigger></TabsList><TabsContent value="restaurants" className="mt-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{restaurantResults.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>{restaurantResults.length === 0 && <p className="py-16 text-center text-muted-foreground">No restaurants found.</p>}</TabsContent><TabsContent value="dishes" className="mt-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{foodResults.map((item) => <FoodCard key={item.id} item={item} restaurantId={item.restaurantId} restaurantName={item.restaurantName} />)}</div>{foodResults.length === 0 && <p className="py-16 text-center text-muted-foreground">No dishes found.</p>}</TabsContent><TabsContent value="cuisines" className="mt-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Indian', 'Biryani', 'Chinese', 'Italian', 'Mughlai', 'Desserts', 'Fast Food', 'Bakery'].map((cuisine) => <button key={cuisine} onClick={() => setQuery(cuisine)} className="rounded-2xl border border-border bg-card p-5 text-left font-display font-semibold transition-colors hover:border-primary hover:text-primary">{cuisine}</button>)}</div></TabsContent></Tabs></div>;
}
