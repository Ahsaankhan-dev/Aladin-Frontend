import type { CategoryItem, Product } from "./types";

export const categories: CategoryItem[] = [
  { label: "Facial Cleanser", href: "/products?cat=facial-cleanser&page=1" },
  { label: "Pomade", href: "/products?cat=pomade&page=1" },
  { label: "Perfume", href: "/products?cat=perfume&page=1" },
  { label: "Baby Powder", href: "/products?cat=baby-powder&page=1" },
  { label: "Eye Liner", href: "/products?cat=eye-liner&page=1" },
  { label: "Lip Clippers", href: "/products?cat=lip-clippers&page=1" },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "lorem ipsum fire tv with alexa voice remote TV etc.",
    image: "/assets/products/p1.png",
    rating: 4.5,
    reviews: 11,
    priceFrom: 39.99,
    priceTo: 30.65,
    href: "/products/p1",
  },
  {
    id: "p2",
    title: "lorem ipsum fire tv with alexa voice remote TV etc.",
    image: "/assets/products/p2.png",
    rating: 4.5,
    reviews: 11,
    priceFrom: 39.99,
    priceTo: 30.65,
    href: "/products/p2",
  },
  {
    id: "p3",
    title: "lorem ipsum fire tv with alexa voice remote TV etc.",
    image: "/assets/products/p3.png",
    rating: 4.5,
    reviews: 11,
    priceFrom: 39.99,
    priceTo: 30.65,
    href: "/products/p3",
  },
  {
    id: "p4",
    title: "lorem ipsum fire tv with alexa voice remote TV etc.",
    image: "/assets/products/p4.png",
    rating: 4.5,
    reviews: 11,
    priceFrom: 39.99,
    priceTo: 30.65,
    href: "/products/p4",
  },
];