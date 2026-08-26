export type FoodType = 'veg' | 'non-veg';

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  ratingCount: number;
  type: FoodType;
  category: string;
  isBestSeller?: boolean;
  isTrending?: boolean;
  customizable?: boolean;
  restaurantName?: string;
  restaurantId?: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  logo: string;
  coverImage: string;
  cuisines: string[];
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  deliveryFee: number;
  priceRange: string;
  distance: string;
  offer: string;
  offerPercent: number;
  isFavorite: boolean;
  isOpen: boolean;
  minOrder: number;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  menu: MenuItem[];
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  discountType: 'percent' | 'flat' | 'free-delivery';
  maxDiscount: number;
  minOrder: number;
  validity: string;
  category: 'all' | 'restaurant' | 'food' | 'free-delivery' | 'bank' | 'coupon';
  color: string;
}

export interface Order {
  id: string;
  restaurant: string;
  restaurantLogo: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'placed' | 'accepted' | 'preparing' | 'ready' | 'picked-up' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentMethod: string;
  address: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  hasPhoto: boolean;
}

export interface Notification {
  id: string;
  type: 'order' | 'offer' | 'payment' | 'delivery' | 'account';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const categories: Category[] = [
  { id: 'pizza', name: 'Pizza', image: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'burgers', name: 'Burgers', image: 'https://images.pexels.com/photos/4109132/pexels-photo-4109132.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'biryani', name: 'Biryani', image: 'https://images.pexels.com/photos/12799631/pexels-photo-12799631.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'chinese', name: 'Chinese', image: 'https://images.pexels.com/photos/30495093/pexels-photo-30495093.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'north-indian', name: 'North Indian', image: 'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'south-indian', name: 'South Indian', image: 'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'desserts', name: 'Desserts', image: 'https://images.pexels.com/photos/12927170/pexels-photo-12927170.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'cakes', name: 'Cakes', image: 'https://images.pexels.com/photos/14945388/pexels-photo-14945388.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'bakery', name: 'Bakery', image: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'fast-food', name: 'Fast Food', image: 'https://images.pexels.com/photos/4109116/pexels-photo-4109116.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'rolls', name: 'Rolls', image: 'https://images.pexels.com/photos/35041652/pexels-photo-35041652.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'momos', name: 'Momos', image: 'https://images.pexels.com/photos/18803177/pexels-photo-18803177.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'beverages', name: 'Beverages', image: 'https://images.pexels.com/photos/5172006/pexels-photo-5172006.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
  { id: 'healthy', name: 'Healthy Food', image: 'https://images.pexels.com/photos/35041652/pexels-photo-35041652.jpeg?auto=compress&cs=tinysrgb&h=200&w=200' },
];

export const cuisines = [
  { name: 'Indian', image: 'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/30495093/pexels-photo-30495093.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Italian', image: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Mexican', image: 'https://images.pexels.com/photos/4109132/pexels-photo-4109132.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Thai', image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Korean', image: 'https://images.pexels.com/photos/7363672/pexels-photo-7363672.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Japanese', image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Continental', image: 'https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Mughlai', image: 'https://images.pexels.com/photos/30748997/pexels-photo-30748997.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Bakery', image: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { name: 'Desserts', image: 'https://images.pexels.com/photos/12927170/pexels-photo-12927170.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
];

const biryaniImg = 'https://images.pexels.com/photos/12799631/pexels-photo-12799631.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const biryaniImg2 = 'https://images.pexels.com/photos/30748997/pexels-photo-30748997.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const paneerImg = 'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const paneerImg2 = 'https://images.pexels.com/photos/35041652/pexels-photo-35041652.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const paneerImg3 = 'https://images.pexels.com/photos/30858402/pexels-photo-30858402.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const pizzaImg = 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const pizzaImg2 = 'https://images.pexels.com/photos/4109132/pexels-photo-4109132.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const burgerImg = 'https://images.pexels.com/photos/4109116/pexels-photo-4109116.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const burgerImg2 = 'https://images.pexels.com/photos/4109256/pexels-photo-4109256.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const momosImg = 'https://images.pexels.com/photos/18803177/pexels-photo-18803177.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const momosImg2 = 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const noodlesImg = 'https://images.pexels.com/photos/30495093/pexels-photo-30495093.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const cakeImg = 'https://images.pexels.com/photos/14945388/pexels-photo-14945388.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const dessertImg = 'https://images.pexels.com/photos/5172006/pexels-photo-5172006.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const dessertImg2 = 'https://images.pexels.com/photos/32318140/pexels-photo-32318140.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const thaliImg = 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const thaliImg2 = 'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const restImg1 = 'https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const restImg2 = 'https://images.pexels.com/photos/12181619/pexels-photo-12181619.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const restImg3 = 'https://images.pexels.com/photos/32568165/pexels-photo-32568165.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const restImg4 = 'https://images.pexels.com/photos/35833817/pexels-photo-35833817.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';
const fastFoodImg = 'https://images.pexels.com/photos/19786212/pexels-photo-19786212.jpeg?auto=compress&cs=tinysrgb&h=400&w=600';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'the-food-house',
    name: 'The Food House',
    logo: 'https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: restImg1,
    cuisines: ['Indian', 'Chinese', 'Fast Food'],
    rating: 4.7,
    ratingCount: 2450,
    deliveryTime: '25-35 min',
    deliveryFee: 30,
    priceRange: '₹200 for two',
    distance: '1.2 km',
    offer: '20% OFF up to ₹100',
    offerPercent: 20,
    isFavorite: false,
    isOpen: true,
    minOrder: 99,
    description: 'A cozy multi-cuisine restaurant serving the best of Indian, Chinese and continental dishes. Known for generous portions and authentic flavors.',
    address: '12 Park Street, Park Street Area, Kolkata, West Bengal 700016',
    phone: '+91 98300 12345',
    email: 'contact@thefoodhouse.in',
    openingHours: '11:00 AM - 11:00 PM (Mon-Sun)',
    menu: [
      { id: 'f1', name: 'Chicken Biryani', description: 'Aromatic basmati rice cooked with tender chicken pieces, saffron and special spices', price: 249, originalPrice: 299, image: biryaniImg, rating: 4.8, ratingCount: 1200, type: 'non-veg', category: 'Biryani', isBestSeller: true, isTrending: true, customizable: true },
      { id: 'f2', name: 'Mutton Biryani', description: 'Slow-cooked mutton with fragrant basmati rice, fried onions and mint', price: 329, originalPrice: 399, image: biryaniImg2, rating: 4.7, ratingCount: 850, type: 'non-veg', category: 'Biryani', isBestSeller: true, customizable: true },
      { id: 'f3', name: 'Paneer Butter Masala', description: 'Cottage cheese cubes in a rich, creamy tomato-butter gravy', price: 199, originalPrice: 249, image: paneerImg, rating: 4.6, ratingCount: 620, type: 'veg', category: 'Main Course', isBestSeller: true },
      { id: 'f4', name: 'Chicken Tikka', description: 'Char-grilled chicken marinated in yogurt and aromatic spices', price: 279, originalPrice: 329, image: paneerImg3, rating: 4.7, ratingCount: 430, type: 'non-veg', category: 'Starters' },
      { id: 'f5', name: 'Veg Chowmein', description: 'Stir-fried noodles with fresh vegetables and sauces', price: 149, image: noodlesImg, rating: 4.3, ratingCount: 310, type: 'veg', category: 'Chinese' },
      { id: 'f6', name: 'Chicken Momos', description: 'Steamed dumplings filled with spiced minced chicken', price: 129, originalPrice: 159, image: momosImg, rating: 4.5, ratingCount: 540, type: 'non-veg', category: 'Chinese', isTrending: true },
      { id: 'f7', name: 'Gulab Jamun', description: 'Soft milk-based dumplings soaked in rose-flavored sugar syrup', price: 99, image: dessertImg, rating: 4.6, ratingCount: 280, type: 'veg', category: 'Desserts' },
      { id: 'f8', name: 'Cold Coffee', description: 'Chilled coffee blended with milk, ice cream and chocolate', price: 119, image: dessertImg2, rating: 4.4, ratingCount: 190, type: 'veg', category: 'Beverages' },
    ],
  },
  {
    id: '2',
    slug: 'kolkata-biryani-house',
    name: 'Kolkata Biryani House',
    logo: 'https://images.pexels.com/photos/30748997/pexels-photo-30748997.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/30748997/pexels-photo-30748997.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['Biryani', 'Mughlai', 'North Indian'],
    rating: 4.8,
    ratingCount: 3200,
    deliveryTime: '30-40 min',
    deliveryFee: 20,
    priceRange: '₹300 for two',
    distance: '2.5 km',
    offer: 'Flat 30% OFF up to ₹150',
    offerPercent: 30,
    isFavorite: true,
    isOpen: true,
    minOrder: 149,
    description: 'Legendary Kolkata-style biryani with authentic flavors passed down through generations. A must-visit for biryani lovers.',
    address: '45 AJC Bose Road, Taltala, Kolkata, West Bengal 700016',
    phone: '+91 98311 22345',
    email: 'order@kolkatabiryani.in',
    openingHours: '10:00 AM - 12:00 AM (Mon-Sun)',
    menu: [
      { id: 'f9', name: 'Special Chicken Biryani', description: 'Kolkata-style biryani with potato, egg and tender chicken', price: 269, originalPrice: 349, image: biryaniImg, rating: 4.9, ratingCount: 2100, type: 'non-veg', category: 'Biryani', isBestSeller: true, isTrending: true, customizable: true },
      { id: 'f10', name: 'Mutton Biryani Special', description: 'Premium mutton biryani with aloo, egg and rich masala', price: 369, originalPrice: 449, image: biryaniImg2, rating: 4.8, ratingCount: 1500, type: 'non-veg', category: 'Biryani', isBestSeller: true, customizable: true },
      { id: 'f11', name: 'Egg Biryani', description: 'Fragrant rice with boiled eggs and special spices', price: 179, image: biryaniImg, rating: 4.4, ratingCount: 420, type: 'non-veg', category: 'Biryani' },
      { id: 'f12', name: 'Chicken Chaap', description: 'Rich, creamy chicken in Mughlai-style gravy', price: 249, originalPrice: 299, image: paneerImg3, rating: 4.7, ratingCount: 380, type: 'non-veg', category: 'Main Course' },
      { id: 'f13', name: 'Paneer Tikka', description: 'Grilled cottage cheese with bell peppers and mint chutney', price: 219, image: paneerImg, rating: 4.5, ratingCount: 290, type: 'veg', category: 'Starters' },
      { id: 'f14', name: 'Shahi Paneer', description: 'Royal paneer curry in a creamy cashew-based gravy', price: 229, originalPrice: 269, image: paneerImg2, rating: 4.6, ratingCount: 340, type: 'veg', category: 'Main Course' },
    ],
  },
  {
    id: '3',
    slug: 'pizza-corner',
    name: 'Pizza Corner',
    logo: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.5,
    ratingCount: 1800,
    deliveryTime: '20-30 min',
    deliveryFee: 40,
    priceRange: '₹400 for two',
    distance: '0.8 km',
    offer: 'Buy 1 Get 1 Free',
    offerPercent: 50,
    isFavorite: false,
    isOpen: true,
    minOrder: 199,
    description: 'Wood-fired pizzas, cheesy pastas and Italian classics made with fresh ingredients and authentic recipes.',
    address: '78 Camac Street, Elgin, Kolkata, West Bengal 700016',
    phone: '+91 98322 34567',
    email: 'hello@pizzacorner.in',
    openingHours: '11:00 AM - 11:00 PM (Mon-Sun)',
    menu: [
      { id: 'f15', name: 'Margherita Pizza', description: 'Classic pizza with mozzarella, tomato sauce and basil', price: 199, originalPrice: 249, image: pizzaImg, rating: 4.6, ratingCount: 980, type: 'veg', category: 'Pizza', isBestSeller: true, isTrending: true, customizable: true },
      { id: 'f16', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni slices and extra cheese', price: 299, originalPrice: 349, image: pizzaImg2, rating: 4.7, ratingCount: 760, type: 'non-veg', category: 'Pizza', isBestSeller: true, customizable: true },
      { id: 'f17', name: 'Veg Supreme Pizza', description: 'Garden-fresh vegetables with mozzarella and herbs', price: 279, image: pizzaImg, rating: 4.4, ratingCount: 520, type: 'veg', category: 'Pizza', customizable: true },
      { id: 'f18', name: 'Chicken Burger', description: 'Juicy grilled chicken patty with cheese and veggies', price: 149, originalPrice: 199, image: burgerImg, rating: 4.5, ratingCount: 640, type: 'non-veg', category: 'Burgers', isTrending: true },
      { id: 'f19', name: 'Veg Burger', description: 'Crispy veg patty with lettuce, tomato and mayo', price: 119, image: burgerImg2, rating: 4.2, ratingCount: 380, type: 'veg', category: 'Burgers' },
      { id: 'f20', name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs', price: 99, image: pizzaImg2, rating: 4.3, ratingCount: 290, type: 'veg', category: 'Starters' },
    ],
  },
  {
    id: '4',
    slug: 'burger-junction',
    name: 'Burger Junction',
    logo: 'https://images.pexels.com/photos/4109116/pexels-photo-4109116.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/4109116/pexels-photo-4109116.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['Fast Food', 'Burgers', 'American'],
    rating: 4.4,
    ratingCount: 1200,
    deliveryTime: '15-25 min',
    deliveryFee: 25,
    priceRange: '₹250 for two',
    distance: '1.5 km',
    offer: '15% OFF on all orders',
    offerPercent: 15,
    isFavorite: false,
    isOpen: true,
    minOrder: 99,
    description: 'Gourmet burgers, loaded fries and shakes. The ultimate comfort food destination with a modern twist.',
    address: '23 Loudon Street, Kolkata, West Bengal 700017',
    phone: '+91 98344 45678',
    email: 'eat@burgerjunction.in',
    openingHours: '10:00 AM - 1:00 AM (Mon-Sun)',
    menu: [
      { id: 'f21', name: 'Classic Chicken Burger', description: 'Grilled chicken, cheese, lettuce, tomato and house sauce', price: 179, originalPrice: 219, image: burgerImg, rating: 4.5, ratingCount: 580, type: 'non-veg', category: 'Burgers', isBestSeller: true, customizable: true },
      { id: 'f22', name: 'Double Cheese Burger', description: 'Two patties, double cheese, caramelized onions', price: 249, originalPrice: 299, image: burgerImg2, rating: 4.6, ratingCount: 490, type: 'non-veg', category: 'Burgers', isBestSeller: true, isTrending: true },
      { id: 'f23', name: 'Veg Cheese Burger', description: 'Crispy veg patty with melted cheese and veggies', price: 139, image: burgerImg, rating: 4.3, ratingCount: 340, type: 'veg', category: 'Burgers' },
      { id: 'f24', name: 'Loaded Fries', description: 'Fries topped with cheese, jalapenos and salsa', price: 129, image: fastFoodImg, rating: 4.4, ratingCount: 420, type: 'veg', category: 'Fast Food', isTrending: true },
      { id: 'f25', name: 'Chocolate Shake', description: 'Thick chocolate milkshake with whipped cream', price: 149, image: dessertImg2, rating: 4.5, ratingCount: 310, type: 'veg', category: 'Beverages' },
    ],
  },
  {
    id: '5',
    slug: 'spice-villa',
    name: 'Spice Villa',
    logo: 'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['North Indian', 'Mughlai'],
    rating: 4.6,
    ratingCount: 2100,
    deliveryTime: '35-45 min',
    deliveryFee: 35,
    priceRange: '₹350 for two',
    distance: '3.0 km',
    offer: '25% OFF up to ₹120',
    offerPercent: 25,
    isFavorite: true,
    isOpen: true,
    minOrder: 199,
    description: 'Authentic North Indian and Mughlai cuisine. Rich curries, tender kebabs and fresh breads made to order.',
    address: '56 Shakespeare Sarani, Kolkata, West Bengal 700017',
    phone: '+91 98366 56789',
    email: 'dine@spicevilla.in',
    openingHours: '12:00 PM - 11:30 PM (Mon-Sun)',
    menu: [
      { id: 'f26', name: 'Paneer Butter Masala', description: 'Cottage cheese in a velvety tomato-butter gravy', price: 229, originalPrice: 279, image: paneerImg, rating: 4.7, ratingCount: 890, type: 'veg', category: 'Main Course', isBestSeller: true },
      { id: 'f27', name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato gravy', price: 289, originalPrice: 349, image: paneerImg3, rating: 4.8, ratingCount: 1100, type: 'non-veg', category: 'Main Course', isBestSeller: true, isTrending: true },
      { id: 'f28', name: 'Dal Makhani', description: 'Slow-cooked black lentils in a creamy gravy', price: 179, image: thaliImg, rating: 4.5, ratingCount: 560, type: 'veg', category: 'Main Course' },
      { id: 'f29', name: 'Chicken Tikka Masala', description: 'Grilled chicken tikka in a spiced onion-tomato gravy', price: 269, originalPrice: 319, image: paneerImg3, rating: 4.7, ratingCount: 720, type: 'non-veg', category: 'Main Course' },
      { id: 'f30', name: 'Garlic Naan', description: 'Soft tandoor-baked bread with garlic and butter', price: 49, image: thaliImg2, rating: 4.4, ratingCount: 430, type: 'veg', category: 'Breads' },
      { id: 'f31', name: 'Gulab Jamun (2 pcs)', description: 'Soft dumplings in rose-flavored sugar syrup', price: 89, image: dessertImg, rating: 4.6, ratingCount: 380, type: 'veg', category: 'Desserts' },
    ],
  },
  {
    id: '6',
    slug: 'sweet-cravings',
    name: 'Sweet Cravings',
    logo: 'https://images.pexels.com/photos/12927170/pexels-photo-12927170.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/12927170/pexels-photo-12927170.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['Desserts', 'Bakery', 'Cakes'],
    rating: 4.7,
    ratingCount: 950,
    deliveryTime: '20-30 min',
    deliveryFee: 30,
    priceRange: '₹300 for two',
    distance: '1.8 km',
    offer: 'Flat ₹50 OFF on ₹200+',
    offerPercent: 25,
    isFavorite: false,
    isOpen: true,
    minOrder: 99,
    description: 'Heavenly desserts, artisanal cakes and baked treats. Perfect for satisfying your sweet tooth.',
    address: '89 Park Mansions, Park Street, Kolkata, West Bengal 700016',
    phone: '+91 98388 67890',
    email: 'sweet@sweetcravings.in',
    openingHours: '10:00 AM - 10:00 PM (Mon-Sun)',
    menu: [
      { id: 'f32', name: 'Chocolate Cake', description: 'Rich molten chocolate cake with a gooey center', price: 179, originalPrice: 219, image: cakeImg, rating: 4.8, ratingCount: 620, type: 'veg', category: 'Cakes', isBestSeller: true, isTrending: true },
      { id: 'f33', name: 'Red Velvet Cake', description: 'Moist red velvet layers with cream cheese frosting', price: 199, image: dessertImg2, rating: 4.7, ratingCount: 480, type: 'veg', category: 'Cakes', isBestSeller: true },
      { id: 'f34', name: 'Cheesecake', description: 'New York-style baked cheesecake with berry compote', price: 229, originalPrice: 269, image: dessertImg, rating: 4.6, ratingCount: 390, type: 'veg', category: 'Desserts' },
      { id: 'f35', name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: 189, image: dessertImg2, rating: 4.5, ratingCount: 280, type: 'veg', category: 'Desserts', isTrending: true },
      { id: 'f36', name: 'Ice Cream Sundae', description: 'Vanilla and chocolate ice cream with nuts and syrup', price: 149, image: dessertImg, rating: 4.4, ratingCount: 220, type: 'veg', category: 'Desserts' },
    ],
  },
  {
    id: '7',
    slug: 'taste-of-india',
    name: 'Taste of India',
    logo: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['North Indian', 'South Indian', 'Thali'],
    rating: 4.5,
    ratingCount: 1500,
    deliveryTime: '30-40 min',
    deliveryFee: 20,
    priceRange: '₹250 for two',
    distance: '2.0 km',
    offer: '10% OFF up to ₹80',
    offerPercent: 10,
    isFavorite: false,
    isOpen: false,
    minOrder: 99,
    description: 'A traditional Indian eatery serving hearty thalis, regional specialties and homestyle cooking.',
    address: '34 Chowringhee Road, Kolkata, West Bengal 700016',
    phone: '+91 98399 78901',
    email: 'eat@tasteofindia.in',
    openingHours: '11:00 AM - 10:30 PM (Mon-Sun)',
    menu: [
      { id: 'f37', name: 'Veg Thali', description: 'Complete meal with rice, dal, sabzi, roti, papad and sweet', price: 179, originalPrice: 199, image: thaliImg, rating: 4.5, ratingCount: 680, type: 'veg', category: 'Thali', isBestSeller: true },
      { id: 'f38', name: 'Non-Veg Thali', description: 'Rice, dal, chicken curry, roti, salad and dessert', price: 249, originalPrice: 299, image: thaliImg2, rating: 4.6, ratingCount: 540, type: 'non-veg', category: 'Thali', isBestSeller: true },
      { id: 'f39', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling and chutneys', price: 129, image: thaliImg2, rating: 4.4, ratingCount: 420, type: 'veg', category: 'South Indian', isTrending: true },
      { id: 'f40', name: 'Chole Bhature', description: 'Spicy chickpea curry with fluffy fried bread', price: 149, image: thaliImg, rating: 4.5, ratingCount: 380, type: 'veg', category: 'North Indian' },
    ],
  },
  {
    id: '8',
    slug: 'the-bakery-studio',
    name: 'The Bakery Studio',
    logo: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    coverImage: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    cuisines: ['Bakery', 'Desserts', 'Continental'],
    rating: 4.6,
    ratingCount: 780,
    deliveryTime: '25-35 min',
    deliveryFee: 35,
    priceRange: '₹350 for two',
    distance: '2.8 km',
    offer: '20% OFF on first order',
    offerPercent: 20,
    isFavorite: false,
    isOpen: true,
    minOrder: 149,
    description: 'Artisanal bakery serving fresh breads, pastries, sandwiches and custom cakes. Every bite is crafted with love.',
    address: '67 Mirza Ghalib Street, Kolkata, West Bengal 700016',
    phone: '+91 98400 89012',
    email: 'bake@thebakerystudio.in',
    openingHours: '7:00 AM - 9:00 PM (Mon-Sun)',
    menu: [
      { id: 'f41', name: 'Croissant', description: 'Buttery, flaky French-style croissant', price: 89, image: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', rating: 4.5, ratingCount: 240, type: 'veg', category: 'Bakery' },
      { id: 'f42', name: 'Chocolate Pastry', description: 'Layers of chocolate sponge with ganache', price: 119, originalPrice: 149, image: cakeImg, rating: 4.6, ratingCount: 320, type: 'veg', category: 'Desserts', isBestSeller: true },
      { id: 'f43', name: 'Veg Sandwich', description: 'Grilled sandwich with fresh veggies and cheese', price: 99, image: 'https://images.pexels.com/photos/13914952/pexels-photo-13914952.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', rating: 4.3, ratingCount: 180, type: 'veg', category: 'Continental' },
      { id: 'f44', name: 'Blueberry Muffin', description: 'Soft muffin with fresh blueberries', price: 79, image: dessertImg, rating: 4.4, ratingCount: 160, type: 'veg', category: 'Bakery', isTrending: true },
    ],
  },
];

export const allMenuItems: MenuItem[] = restaurants.flatMap((r) =>
  r.menu.map((m) => ({ ...m, restaurantName: r.name, restaurantId: r.id }))
);

export const coupons: Coupon[] = [
  { id: 'c1', code: 'FOOD40', title: 'FLAT 40% OFF', description: 'Get 40% off on orders above ₹199', discount: '40%', discountType: 'percent', maxDiscount: 150, minOrder: 199, validity: 'Valid till Dec 31, 2026', category: 'all', color: 'from-primary to-primary-dark' },
  { id: 'c2', code: 'FREEDEL', title: 'FREE DELIVERY', description: 'Free delivery on orders above ₹299', discount: 'Free Delivery', discountType: 'free-delivery', maxDiscount: 50, minOrder: 299, validity: 'Valid till Nov 30, 2026', category: 'free-delivery', color: 'from-success to-success' },
  { id: 'c3', code: 'SAVE100', title: '₹100 OFF', description: 'Flat ₹100 off on orders above ₹399', discount: '₹100', discountType: 'flat', maxDiscount: 100, minOrder: 399, validity: 'Valid till Jan 15, 2027', category: 'all', color: 'from-warning to-orange-500' },
  { id: 'c4', code: 'PIZZA50', title: '50% OFF PIZZA', description: '50% off on all pizza orders', discount: '50%', discountType: 'percent', maxDiscount: 200, minOrder: 199, validity: 'Valid till Dec 15, 2026', category: 'food', color: 'from-chart-4 to-chart-5' },
  { id: 'c5', code: 'AXIS200', title: '₹200 OFF with AXIS', description: '₹200 off with Axis Bank credit cards', discount: '₹200', discountType: 'flat', maxDiscount: 200, minOrder: 599, validity: 'Valid till Oct 31, 2026', category: 'bank', color: 'from-chart-3 to-chart-1' },
  { id: 'c6', code: 'FIRST20', title: '20% OFF FIRST ORDER', description: '20% off on your first order up to ₹100', discount: '20%', discountType: 'percent', maxDiscount: 100, minOrder: 149, validity: 'Valid for new users', category: 'all', color: 'from-primary to-chart-5' },
  { id: 'c7', code: 'BIRYANI30', title: '30% OFF BIRYANI', description: '30% off on all biryani orders', discount: '30%', discountType: 'percent', maxDiscount: 120, minOrder: 149, validity: 'Valid till Dec 31, 2026', category: 'restaurant', color: 'from-chart-5 to-primary' },
  { id: 'c8', code: 'WEEKEND15', title: 'WEEKEND SPECIAL', description: '15% off on weekend orders up to ₹80', discount: '15%', discountType: 'percent', maxDiscount: 80, minOrder: 199, validity: 'Sat & Sun only', category: 'coupon', color: 'from-chart-2 to-chart-3' },
];

export const orders: Order[] = [
  {
    id: 'ORD-2026-001',
    restaurant: 'Kolkata Biryani House',
    restaurantLogo: 'https://images.pexels.com/photos/30748997/pexels-photo-30748997.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    date: 'Aug 26, 2026, 7:32 PM',
    items: [
      { name: 'Special Chicken Biryani', quantity: 2, price: 269 },
      { name: 'Chicken Chaap', quantity: 1, price: 249 },
    ],
    total: 787,
    status: 'out-for-delivery',
    paymentMethod: 'UPI',
    address: 'Home - 12B Park Street, Kolkata 700016',
  },
  {
    id: 'ORD-2026-002',
    restaurant: 'Pizza Corner',
    restaurantLogo: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    date: 'Aug 24, 2026, 8:15 PM',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 199 },
      { name: 'Garlic Bread', quantity: 2, price: 99 },
    ],
    total: 397,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    address: 'Home - 12B Park Street, Kolkata 700016',
  },
  {
    id: 'ORD-2026-003',
    restaurant: 'Sweet Cravings',
    restaurantLogo: 'https://images.pexels.com/photos/12927170/pexels-photo-12927170.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    date: 'Aug 20, 2026, 9:00 PM',
    items: [
      { name: 'Chocolate Cake', quantity: 1, price: 179 },
      { name: 'Ice Cream Sundae', quantity: 2, price: 149 },
    ],
    total: 477,
    status: 'delivered',
    paymentMethod: 'Wallet',
    address: 'Work - Sector 5, Salt Lake, Kolkata 700091',
  },
  {
    id: 'ORD-2026-004',
    restaurant: 'Burger Junction',
    restaurantLogo: 'https://images.pexels.com/photos/4109116/pexels-photo-4109116.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    date: 'Aug 15, 2026, 1:30 PM',
    items: [
      { name: 'Double Cheese Burger', quantity: 2, price: 249 },
      { name: 'Loaded Fries', quantity: 1, price: 129 },
    ],
    total: 627,
    status: 'cancelled',
    paymentMethod: 'UPI',
    address: 'Home - 12B Park Street, Kolkata 700016',
  },
];

export const reviews: Review[] = [
  { id: 'r1', userName: 'Priya Sharma', userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 5, date: '2 days ago', comment: 'Absolutely loved the biryani! The flavors were authentic and the portion was generous. Will definitely order again.', helpful: 24, hasPhoto: true },
  { id: 'r2', userName: 'Rahul Verma', userAvatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 4, date: '5 days ago', comment: 'Great food and quick delivery. The chicken chaap was a bit spicy but delicious overall.', helpful: 12, hasPhoto: false },
  { id: 'r3', userName: 'Ananya Das', userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 5, date: '1 week ago', comment: 'Best biryani in Kolkata! The mutton was so tender and the rice was perfectly cooked. Highly recommend.', helpful: 38, hasPhoto: true },
  { id: 'r4', userName: 'Sourav Roy', userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 4, date: '2 weeks ago', comment: 'Good food, reasonable prices. The delivery was on time and the packaging was neat.', helpful: 8, hasPhoto: false },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'order', title: 'Order Out for Delivery', message: 'Your order ORD-2026-001 is on the way! Arriving in 18 minutes.', time: '5 min ago', isRead: false },
  { id: 'n2', type: 'offer', title: 'Special Weekend Offer', message: 'Get 40% off on all orders this weekend. Use code FOOD40', time: '1 hour ago', isRead: false },
  { id: 'n3', type: 'payment', title: 'Payment Successful', message: '₹787 paid via UPI for order ORD-2026-001', time: '2 hours ago', isRead: true },
  { id: 'n4', type: 'delivery', title: 'Delivery Partner Assigned', message: 'Rajesh Kumar is your delivery partner for order ORD-2026-001', time: '3 hours ago', isRead: true },
  { id: 'n5', type: 'offer', title: 'New Restaurant Added', message: 'The Bakery Studio is now available in your area!', time: '1 day ago', isRead: true },
  { id: 'n6', type: 'account', title: 'Profile Updated', message: 'Your profile information has been updated successfully.', time: '2 days ago', isRead: true },
];

export const addresses = [
  { id: 'a1', label: 'Home', name: 'Arjun Mehta', phone: '+91 98300 12345', address: '12B Park Street, Park Street Area', landmark: 'Near Park Hotel', city: 'Kolkata', state: 'West Bengal', pincode: '700016', isDefault: true },
  { id: 'a2', label: 'Work', name: 'Arjun Mehta', phone: '+91 98300 12345', address: 'Sector 5, Salt Lake, WF Complex', landmark: 'Opposite City Centre', city: 'Kolkata', state: 'West Bengal', pincode: '700091', isDefault: false },
];

export const deliveryPartner = {
  name: 'Rajesh Kumar',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
  rating: 4.8,
  vehicle: 'Honda Activa - WB 26 AB 1234',
  phone: '+91 98300 99999',
};

export function getRestaurant(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}

export function getMenuItem(id: string): { item: MenuItem; restaurant: Restaurant } | undefined {
  for (const r of restaurants) {
    const item = r.menu.find((m) => m.id === id);
    if (item) return { item, restaurant: r };
  }
  return undefined;
}

export function formatPrice(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}
