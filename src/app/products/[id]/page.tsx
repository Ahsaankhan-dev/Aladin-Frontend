import { products } from "@/features/products/data";
import ProductDetailClient from "@/features/products/components/ProductDetailClient";
import { notFound } from "next/navigation";


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}