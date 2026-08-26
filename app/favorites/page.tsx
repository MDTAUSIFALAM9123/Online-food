'use client';

import { Heart } from 'lucide-react';
import { RestaurantCard } from '@/components/cards/restaurant-card';
import { FoodCard } from '@/components/cards/food-card';
import { EmptyState } from '@/components/shared/empty-state';
import { restaurants, allMenuItems } from '@/lib/data';
export default function FavoritesPage() { const favoriteRestaurants = restaurants.filter((restaurant) => restaurant.isFavorite); const favoriteDishes = allMenuItems.filter((item) => item.isBestSeller).slice(0, 4); return <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8"><h1 className="font-display text-3xl font-bold">Favorites</h1><p className="mt-1 text-muted-foreground">Your saved restaurants and dishes, all in one place.</p><h2 className="mt-8 font-display text-xl font-bold">Favorite restaurants</h2>{favoriteRestaurants.length ? <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{favoriteRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div> : <EmptyState icon={<Heart className="h-10 w-10" />} title="No favorite restaurants yet" description="Tap the heart on a restaurant to save it here." actionLabel="Explore Restaurants" actionHref="/restaurants" />}<h2 className="mt-10 font-display text-xl font-bold">Saved dishes</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{favoriteDishes.map((item) => <FoodCard key={item.id} item={item} restaurantId={item.restaurantId} restaurantName={item.restaurantName} />)}</div></div>; }
