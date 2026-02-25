import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "../types";

function Stars({ rating }: { rating: number }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < full;
                const isHalf = i === full && half;

                return (
                    <Star
                        key={i}
                        className={`h-3 w-3 ${filled || isHalf ? "fill-amber-500 text-amber-500" : "text-slate-300"
                            }`}
                    />
                );
            })}
        </div>
    );
}

export default function ProductCard({ p }: { p: Product }) {
    return (
        <Link href={p.href} className="block">
            <div className="overflow-hidden rounded bg-white shadow-sm">
                <div className="relative h-60 w-full bg-slate-100">
                    <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="p-3">
                    <p className="line-clamp-2 text-[12px] font-semibold text-slate-700">
                        {p.title}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                        <Stars rating={p.rating} />
                        <span className="text-[11px] font-semibold text-slate-400">
                            {p.reviews}
                        </span>
                    </div>

                    <div className="mt-2 text-[12px] font-extrabold text-slate-800">
                        ${p.priceFrom.toFixed(2)} - ${p.priceTo.toFixed(2)}
                    </div>
                </div>
            </div>
        </Link>
    );
}