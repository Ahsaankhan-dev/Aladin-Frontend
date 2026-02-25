import Container from "@/common/components/layout/Container";
import CategoriesSidebar from "./components/CategoriesSidebar";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";
import { products } from "./data";

export default function Productcover() {
    return (
        <>
            <section className="bg-[#0B8BA6] py-8 text-white">
                <Container className="text-center">
                    <h1 className="text-3xl font-extrabold">Aladdin Best sells</h1>
                    <p className="mt-2 text-[12px] opacity-90">
                        Our most popular products based on sales.
                    </p>
                </Container>
            </section>

            <section className="py-6">
                <Container>
                    <div className="flex flex-col gap-6 md:flex-row">
                        <CategoriesSidebar />


                        <div className="flex-1 self-stretch border-l-0 md:border-l-2 md:border-slate-300 md:pl-6 -mt-6 pt-6 -mb-6 pb-6">
                            <h2 className="mb-3 text-[13px] font-extrabold text-slate-700">
                                Beauty &amp; Personal Care
                            </h2>

                            <ProductGrid items={products} />
                            <Pagination />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}