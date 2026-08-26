'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function Carousel({ children, className, itemClassName }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={ref}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-background shadow-md md:flex"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full border-border bg-background shadow-md md:flex"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
