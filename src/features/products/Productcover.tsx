import Container from "@/common/components/layout/Container";
import CategoriesSidebar from "./components/CategoriesSidebar";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";
import { products, categories } from "./data";

const ITEMS_PER_PAGE = 4;

type Props = {
  searchParams?: { cat?: string; page?: string };
};

export default function Productcover({ searchParams }: Props) {
  // ── 1. Read params ──────────────────────────────────────────────
  const currentCat = searchParams?.cat ?? "all";
  const currentPage = Math.max(1, Number(searchParams?.page ?? "1") || 1);

  // ── 2. Filter by category ───────────────────────────────────────
  const filtered =
    !currentCat || currentCat === "all"
      ? products
      : products.filter((p) => p.category === currentCat);

  // ── 3. Paginate ─────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  // ── 4. Active category label ────────────────────────────────────
  const activeCatLabel =
    categories.find((c) => {
      try {
        const sp = new URL(c.href, "http://l").searchParams;
        return sp.get("cat") === currentCat;
      } catch {
        return false;
      }
    })?.label ?? "Beauty & Personal Care";

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B8BA6] py-8 text-white">
        <Container className="text-center">
          <h1 className="text-3xl font-extrabold">Aladdin Best Sells</h1>
          <p className="mt-2 text-[12px] opacity-90">
            Our most popular products based on sales.
          </p>
        </Container>
      </section>

      {/* Main */}
      <section className="py-6">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Sidebar */}
            <CategoriesSidebar />

            {/* Product area */}
            <div className="flex-1 self-stretch border-l-0 md:border-l-2 md:border-slate-300 md:pl-6 -mt-6 pt-6 -mb-6 pb-6">
              <h2 className="mb-3 text-[13px] font-extrabold text-slate-700">
                {activeCatLabel}
                <span className="ml-2 text-slate-400 font-normal text-[11px]">
                  ({filtered.length} products)
                </span>
              </h2>

              {pageItems.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No products found in this category.
                </p>
              ) : (
                <ProductGrid items={pageItems} />
              )}

              {totalPages > 1 && (
                <Pagination totalPages={totalPages} />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}