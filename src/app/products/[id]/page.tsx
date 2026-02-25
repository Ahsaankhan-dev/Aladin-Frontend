import Image from "next/image";
import { products } from "@/features/products/data";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded bg-white p-4">
        <div className="relative h-72 w-full bg-slate-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <h1 className="mt-4 text-xl font-extrabold">{product.title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          ${product.priceFrom.toFixed(2)} - ${product.priceTo.toFixed(2)}
        </p>
      </div>
    </div>
  );
}