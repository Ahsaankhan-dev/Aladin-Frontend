export type Product = {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  priceTo: number;
  category: string;
  href: string;
  description?: string;
};

export type CategoryItem = {
  label: string;
  href: string;
};