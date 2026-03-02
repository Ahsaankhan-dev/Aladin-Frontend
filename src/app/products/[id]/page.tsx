import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";
import { products } from "@/features/products/data";
import Container from "@/common/components/layout/Container";
import { notFound } from "next/navigation";

// ── Star helper ──────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled ? "fill-amber-500 text-amber-500" : "text-slate-300"
            }`}
          />
        );
      })}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────
// ✅ Next.js 16 + React 19: params is a Promise
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-8">
        {/* Back button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0B8BA6] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product detail card */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative h-72 md:h-auto md:w-1/2 bg-slate-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 p-6 md:p-8">
              {/* Category badge */}
              <span className="inline-block rounded-full bg-[#0B8BA6]/10 px-3 py-1 text-[11px] font-semibold text-[#0B8BA6] capitalize mb-3">
                {product.category.replace(/-/g, " ")}
              </span>

              <h1 className="text-xl font-extrabold text-slate-800 leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-[12px] text-slate-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 text-2xl font-extrabold text-slate-900">
                ${product.priceTo.toFixed(2)}
                <span className="ml-2 text-base font-medium text-slate-400 line-through">
                  ${product.priceFrom.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-4 text-[13px] text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <button className="rounded bg-[#0B8BA6] px-6 py-2.5 text-[13px] font-bold text-white hover:opacity-90 transition">
                  Add to Cart
                </button>
                <button className="rounded border border-[#0B8BA6] px-6 py-2.5 text-[13px] font-bold text-[#0B8BA6] hover:bg-[#0B8BA6]/5 transition">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-[14px] font-extrabold text-slate-700 mb-4">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.id}`} className="block">
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition">
                    <div className="relative h-40 bg-slate-100">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        className="object-cover object-top"
                        sizes="25vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 text-[11px] font-semibold text-slate-700">
                        {rp.title}
                      </p>
                      <p className="mt-1 text-[12px] font-extrabold text-slate-800">
                        ${rp.priceTo.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}


export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}