"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    Star,
    ArrowLeft,
    Heart,
    ShoppingCart,
    Truck,
    ShieldCheck,
    MapPin,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    ThumbsUp,
    ThumbsDown,
} from "lucide-react";
import type { Product } from "../types";


type Review = {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    helpful: number;
    verified: boolean;
    images?: string[];
};

type ProductDetails = {
    manufacturer?: string;
    modelNumber?: string;
    dateAvailable?: string;
    productNumber?: string;
    countryOfOrigin?: string;
    bestSellersRank?: string;
};


const mockReviews: Review[] = [
    {
        id: "r1",
        name: "SamiNatha",
        rating: 4.5,
        date: "January 12, 2025",
        title: "Overall - great for athletic",
        body: "Super soft and stretchy! The cotton blend is really comfortable and breathable. I love how it fits well and stays in place during workouts.",
        helpful: 12,
        verified: true,
    },
    {
        id: "r2",
        name: "SamiNatha",
        rating: 4.5,
        date: "January 12, 2025",
        title: "Overall - great for athletic",
        body: "The fabric is super soft and stretchy. It's perfect for working out or doing yoga. I also like that it doesn't feel too heavy or clingy.",
        helpful: 8,
        verified: true,
    },
    {
        id: "r3",
        name: "SamiNatha",
        rating: 4.5,
        date: "January 12, 2025",
        title: "Overall - great for athletic",
        body: "This fabric is really comfortable and easy to work with. It's perfect for those who want something lightweight and breathable.",
        helpful: 5,
        verified: true,
    },
];

const productDetails: ProductDetails = {
    manufacturer: "Adidas",
    modelNumber: "A-LY37910",
    dateAvailable: "January 12, 2025",
    productNumber: "A-LY37910",
    countryOfOrigin: "US",
    bestSellersRank: "#1",
};



function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const cls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < full || (i === full && half);
                return (
                    <Star
                        key={i}
                        className={[
                            cls,
                            filled ? "fill-[#F59E0B] text-[#F59E0B]" : "text-slate-300",
                        ].join(" ")}
                    />
                );
            })}
        </div>
    );
}

function RatingRow({
    label,
    pct,
    count,
}: {
    label: string;
    pct: number;
    count: number;
}) {
    return (
        <div className="flex items-center gap-2 text-[11px]">
            <span className="w-10 shrink-0 text-right text-[#0B8BA6] font-semibold">
                {label}
            </span>
            <div className="h-2.5 flex-1 rounded bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#F59E0B]" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-6 text-slate-500">{count}</span>
        </div>
    );
}



function ImageGallery({
    images,
    title,
}: {
    images: string[];
    title: string;
}) {
    const [active, setActive] = useState(0);

    return (
        <div className="grid grid-cols-[56px_1fr] gap-3">
            {/* thumbs */}
            <div className="flex flex-col gap-2">
                {images.slice(0, 4).map((src, i) => (
                    <button
                        key={src + i}
                        onClick={() => setActive(i)}
                        className={[
                            "relative w-14 h-14 rounded border bg-white overflow-hidden",
                            i === active
                                ? "border-[#0B8BA6] ring-2 ring-[#0B8BA6]/20"
                                : "border-slate-200 hover:border-slate-400",
                        ].join(" ")}
                        aria-label={`Preview ${i + 1}`}
                    >
                        <Image src={src} alt={`${title} ${i + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* main */}
            <div className="relative rounded bg-white border border-slate-200 overflow-hidden min-h-60 sm:min-h-70">
                <Image
                    src={images[active]}
                    alt={title}
                    fill
                    className="object-contain p-4"
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                />

                {images.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 hover:opacity-100 transition">
                        <button
                            onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
                            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-4 w-4 text-slate-700" />
                        </button>
                        <button
                            onClick={() => setActive((p) => (p + 1) % images.length)}
                            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-4 w-4 text-slate-700" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


function ReviewCard({ review }: { review: Review }) {
    const [helpful, setHelpful] = useState(review.helpful);
    const [voted, setVoted] = useState<"up" | "down" | null>(null);

    return (
        <div className="border-b border-slate-100 pb-6 last:border-0">
            <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    {review.avatar ? (
                        <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-600">
                            {review.name.slice(0, 1).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-[12px] font-bold text-slate-800">{review.name}</p>
                        {review.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified Purchase
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Stars rating={review.rating} />
                        <span className="text-[11px] text-slate-500">{review.date}</span>
                    </div>

                    <p className="text-[12px] font-extrabold text-slate-800 mt-2">
                        {review.title}
                    </p>
                    <p className="text-[12px] text-slate-600 leading-relaxed mt-1">
                        {review.body}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-[11px] text-slate-500">Helpful?</span>

                        <button
                            onClick={() => {
                                if (voted === "up") return;
                                setHelpful((h) => h + 1);
                                setVoted("up");
                            }}
                            className={[
                                "inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-semibold",
                                voted === "up"
                                    ? "bg-[#0B8BA6] border-[#0B8BA6] text-white"
                                    : "border-slate-300 text-slate-700 hover:border-slate-500",
                            ].join(" ")}
                        >
                            <ThumbsUp className="h-3 w-3" />
                            Helpful ({helpful})
                        </button>

                        <button
                            onClick={() => setVoted("down")}
                            className={[
                                "inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-semibold",
                                voted === "down"
                                    ? "bg-slate-900 border-slate-900 text-white"
                                    : "border-slate-300 text-slate-700 hover:border-slate-500",
                            ].join(" ")}
                            aria-label="Not helpful"
                        >
                            <ThumbsDown className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default function ProductDetailClient({
    product,
    related,
}: {
    product: Product;
    related: Product[];
}) {
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [added, setAdded] = useState(false);

    const images = useMemo(
        () => [
            product.image,
            "/assets/products/p2.png",
            "/assets/products/p3.png",
            "/assets/products/p4.png",
        ],
        [product.image]
    );

    const ratingDist = useMemo(
        () => [
            { label: "5 star", pct: 65, count: 7 },
            { label: "4 star", pct: 27, count: 3 },
            { label: "3 star", pct: 9, count: 1 },
            { label: "2 star", pct: 3, count: 0 },
            { label: "1 star", pct: 1, count: 0 },
        ],
        []
    );

    const dealPct =
        product.priceFrom > product.priceTo
            ? Math.round(((product.priceFrom - product.priceTo) / product.priceFrom) * 100)
            : 0;

    const handleAddToCart = () => {
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
    };

    const priceRange = `$${product.priceTo.toFixed(2)} - $${(product.priceTo + 1.66).toFixed(2)}`;

    return (
        <div className="min-h-screen bg-white">

            <div className="border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 py-3 text-[11px] text-slate-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-[#0B8BA6]">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-[#0B8BA6]">
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800 font-semibold line-clamp-1 max-w-60">
                        {product.title}
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
             
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-6">
                    {/* left - Image Gallery */}
                    <div className="space-y-3">
                        <ImageGallery images={images} title={product.title} />
                    </div>

              
                    <div className="space-y-3">
                        {/* Best Selling Badge */}
                        <div className="inline-block bg-[#0B8BA6]/10 text-[#0B8BA6] px-3 py-1 rounded-full text-[11px] font-medium">
                            Best Selling
                        </div>

                        <p className="text-[13px] text-slate-800 font-bold leading-snug">
                            Quality the customers by category is a leading, grease-free (SFF 30) fabric.
                        </p>

                        <div className="flex items-center gap-2">
                            <Stars rating={product.rating} size="md" />
                            <span className="text-[12px] text-[#0B8BA6] hover:underline cursor-pointer">
                                {product.reviews} ratings
                            </span>
                        </div>

                    
                        <div className="flex items-end gap-3">
                            <p className="text-[22px] font-extrabold text-[#F97316]">
                                {priceRange}
                            </p>
                        </div>

                        
                        <div className="grid grid-cols-3 gap-4 py-3">
                            <div>
                                <span className="text-[11px] text-slate-500">Category</span>
                                <p className="text-[12px] font-semibold">1</p>
                            </div>
                            <div>
                                <span className="text-[11px] text-slate-500">Quantity</span>
                                <p className="text-[12px] font-semibold">2</p>
                            </div>
                            <div>
                                <span className="text-[11px] text-slate-500">Delivery</span>
                                <p className="text-[12px] font-semibold">2 days</p>
                            </div>
                        </div>

                     
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            FREI offers Stretch Terylene for a high-performance application of Stretch Terylene For garment industry applications (including textile and apparel industries)
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1">
                                <Truck className="h-4 w-4 text-[#0B8BA6]" />
                                <span className="text-[11px]">
                                    <span className="font-semibold">Shipping:</span> Free
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <ShieldCheck className="h-4 w-4 text-[#0B8BA6]" />
                                <span className="text-[11px]">
                                    <span className="font-semibold">Payment:</span> PayPal
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 pt-4">
                            {[
                                { price: "$39.99 - $39.69" },
                                { price: "$39.99 - $33.69" },
                                { price: "$39.90 - $38.95" }
                            ].map((option, i) => (
                                <button
                                    key={i}
                                    className="border border-slate-200 rounded p-3 hover:border-[#0B8BA6]/50 transition bg-white w-full text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden">
                                            <Image 
                                                src={`/assets/products/p${i+2}.png`} 
                                                alt="option" 
                                                fill 
                                                className="object-cover" 
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-medium text-slate-800">
                                                Home: Sponge Tow for with latex elastic memory tape
                                            </p>
                                            <p className="text-[11px] text-[#0B8BA6] font-semibold mt-0.5">
                                                {option.price}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                   
                    <div className="border border-slate-200 rounded bg-white p-4 h-fit">
                        <p className="text-[13px] font-bold text-slate-800">
                            FREE delivery Sunday, February 5
                        </p>
                        <p className="text-[11px] text-slate-600 mt-1">
                            Order within <span className="font-bold text-emerald-700">4 hrs</span>
                        </p>

                        <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-700">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span className="hover:underline cursor-pointer">Deliver to Pakistan</span>
                        </div>

                        <p className="mt-4 text-[13px] font-bold text-emerald-700">
                            In stock
                        </p>

                        <div className="mt-3">
                            <button
                                className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded text-[12px] text-slate-700"
                                onClick={() => setQty((q) => (q >= 10 ? 1 : q + 1))}
                            >
                                <span>
                                    Qty: <span className="font-bold">{qty}</span>
                                </span>
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={[
                                "mt-3 w-full rounded py-2.5 text-[12px] font-extrabold flex items-center justify-center gap-2",
                                added ? "bg-emerald-600 text-white" : "bg-[#0B8BA6] text-white",
                            ].join(" ")}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {added ? "Added to cart" : "Add to Cart"}
                        </button>

                        <button className="mt-2 w-full rounded py-2.5 text-[12px] font-extrabold bg-[#F59E0B] text-white">
                            Buy Now
                        </button>

                        <button
                            onClick={() => setWishlisted((v) => !v)}
                            className={[
                                "mt-3 w-full rounded py-2.5 text-[12px] font-extrabold border flex items-center justify-center gap-2",
                                wishlisted
                                    ? "border-rose-300 bg-rose-50 text-rose-600"
                                    : "border-slate-200 bg-white text-slate-700",
                            ].join(" ")}
                        >
                            <Heart
                                className={[
                                    "h-4 w-4",
                                    wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500",
                                ].join(" ")}
                            />
                            Wishlist
                        </button>

                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                            <div className="flex items-center gap-2 text-[11px] text-slate-700">
                                <ShieldCheck className="h-4 w-4 text-[#0B8BA6]" />
                                <span className="font-semibold">Secure transaction</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-700">
                                <Truck className="h-4 w-4 text-[#0B8BA6]" />
                                <span>Fast delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-700">
                                <ShieldCheck className="h-4 w-4 text-[#0B8BA6]" />
                                <span>Payment protection</span>
                            </div>
                        </div>
                    </div>
                </div>

             
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(related.length ? related.slice(0, 3) : products.slice(0, 3)).map((p, idx) => (
                        <Link
                            key={`${p.id}-${idx}`}
                            href={related.length ? `/products/${p.id}` : "#"}
                            className="border border-slate-200 rounded overflow-hidden bg-white group"
                        >
                            <div className="relative h-44 bg-slate-100">
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-[12px] font-bold text-slate-800 line-clamp-2">
                                    Home: Sponge Tow for with latex elastic memory tape
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Stars rating={4.5} />
                                </div>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <p className="text-[12px] font-extrabold text-[#F97316]">
                                        ${p.priceTo.toFixed(2)}
                                    </p>
                                    <p className="text-[11px] text-slate-400 line-through">
                                        ${p.priceFrom.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

             
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">
                    {/* left: product details */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[12px] font-extrabold text-[#0B8BA6]">
                                Product details
                            </h3>

                            <div className="mt-3 space-y-1 text-[11px] text-slate-700">
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">Manufacturer:</span>
                                    <span className="font-semibold text-slate-800">Adidas</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">Product Description:</span>
                                    <span className="font-semibold text-slate-800">Breathable mesh material made of polyester, nylon, and spandex</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">End Use:</span>
                                    <span className="font-semibold text-slate-800">Athletic wear, activewear, and sportswear</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">Product Number:</span>
                                    <span className="font-semibold text-slate-800">A-LY37910</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">Country Origin:</span>
                                    <span className="font-semibold text-slate-800">US</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-36 text-slate-500">Best sellers Rank:</span>
                                    <span className="font-semibold text-slate-800">#1</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-extrabold text-[#0B8BA6]">
                                Customer reviews
                            </h3>

                            <div className="mt-3 flex items-center gap-2">
                                <Stars rating={4.5} size="md" />
                                <span className="text-[12px] font-bold text-slate-800">
                                    4.5 out of 5
                                </span>
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1">
                                {product.reviews} global ratings
                            </p>

                            <div className="mt-4 space-y-2">
                                {ratingDist.map((r) => (
                                    <RatingRow key={r.label} {...r} />
                                ))}
                            </div>
                        </div>
                    </div>

                 
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[12px] font-extrabold text-[#0B8BA6]">
                                Reviews with images
                            </h3>

                            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="relative w-28 h-20 rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0"
                                    >
                                        <Image 
                                            src={`/assets/products/p${(i % 4) + 1}.png`} 
                                            alt="review media" 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[12px] font-extrabold text-slate-800">
                                Top reviews from United States
                            </h3>

                            <div className="mt-4 space-y-6">
                                {mockReviews.map((r) => (
                                    <ReviewCard key={r.id} review={r} />
                                ))}

                               
                                <div className="flex gap-2">
                                    <button className="rounded bg-[#0B8BA6] text-white text-[11px] font-bold px-3 py-2">
                                        Helpful
                                    </button>
                                    <button className="rounded border border-slate-200 text-[11px] font-bold px-3 py-2 text-slate-700">
                                        Report abuse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

             
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-[12px] font-bold text-[#0B8BA6] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to all products
                </Link>
            </div>
        </div>
    );
}


import { products } from "../data";