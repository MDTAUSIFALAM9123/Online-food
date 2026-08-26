'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Clock, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RestaurantCard } from '@/components/cards/restaurant-card';
import { restaurants } from '@/lib/data';
import { cn } from '@/lib/utils';

const allCuisines = ['All', 'Indian', 'Chinese', 'Italian', 'Biryani', 'Mughlai', 'Fast Food', 'Desserts', 'Bakery', 'South Indian', 'Thali', 'American', 'Continental'];
const filterOptions = [
  { id: 'rating4', label: '4.0+ Rating' },
  { id: 'delivery30', label: 'Under 30 min' },
  { id: 'offers', label: 'Has Offers' },
  { id: 'veg', label: 'Pure Veg' },
  { id: 'open', label: 'Open Now' },
];

export default function RestaurantsPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    let result = [...restaurants];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (selectedCuisine !== 'All') {
      result = result.filter((r) => r.cuisines.includes(selectedCuisine));
    }

    if (activeFilters.includes('rating4')) result = result.filter((r) => r.rating >= 4);
    if (activeFilters.includes('delivery30')) {
      result = result.filter((r) => parseInt(r.deliveryTime) <= 30);
    }
    if (activeFilters.includes('offers')) result = result.filter((r) => r.offer !== '');
    if (activeFilters.includes('open')) result = result.filter((r) => r.isOpen);

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'delivery': result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)); break;
      case 'price-low': result.sort((a, b) => a.minOrder - b.minOrder); break;
      case 'price-high': result.sort((a, b) => b.minOrder - a.minOrder); break;
    }

    return result;
  }, [search, sortBy, activeFilters, selectedCuisine]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Best Restaurants Near You</h1>
      <p className="mt-1 text-muted-foreground">{filtered.length} restaurants delivering to Kolkata, India</p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-full pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-11 w-full rounded-full lg:w-[200px]">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Rating: High to Low</SelectItem>
            <SelectItem value="delivery">Delivery Time</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {allCuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              selectedCuisine === cuisine
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card hover:bg-accent'
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggleFilter(opt.id)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              activeFilters.includes(opt.id)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card hover:bg-accent'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 font-display text-lg font-semibold">No restaurants found</h3>
          <p className="mt-1 text-muted-foreground">Try adjusting your search or filters</p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearch('');
              setActiveFilters([]);
              setSelectedCuisine('All');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
