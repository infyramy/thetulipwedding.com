export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  category: 'Full' | 'Bridal' | 'Hall' | 'Vendor';
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Pengantin Perempuan"
  text: string;
  image: string;
  rating: number;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'Makeup' | 'Photo' | 'Video' | 'Catering' | 'Pelamin';
  image: string;
  startPrice: string;
  description: string;
}

export interface Hall {
  id: string;
  name: string;
  capacity: string;
  location: string;
  address?: string;
  priceRange: string;
  facilities: string[];
  images: string[];
  coordinates: { lat: number; lng: number };
}

export interface GalleryItem {
  id: string;
  src: string;
  category: 'Baju' | 'Pelamin' | 'Dewan' | 'Majlis' | 'Outdoor';
  caption: string;
}