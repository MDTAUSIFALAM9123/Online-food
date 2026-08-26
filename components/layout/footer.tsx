import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-display text-lg font-bold">F</span>
              </div>
              <span className="font-display text-xl font-bold">
                Food<span className="text-primary">Go</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Delicious food delivered to your doorstep. Discover the best restaurants near you.
            </p>
            <div className="mt-4 flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/help" className="hover:text-primary">Help & Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">For You</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/restaurants" className="hover:text-primary">Restaurants</Link></li>
              <li><Link href="/offers" className="hover:text-primary">Offers</Link></li>
              <li><Link href="/favorites" className="hover:text-primary">Favorites</Link></li>
              <li><Link href="/orders" className="hover:text-primary">My Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Partners</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/vendor" className="hover:text-primary">Restaurant Panel</Link></li>
              <li><Link href="/delivery" className="hover:text-primary">Delivery Partner</Link></li>
              <li><Link href="/admin" className="hover:text-primary">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@foodgo.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 1800 123 4567</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kolkata, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 FoodGo. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
