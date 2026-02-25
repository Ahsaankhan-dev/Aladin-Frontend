import type { Product } from "../types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}