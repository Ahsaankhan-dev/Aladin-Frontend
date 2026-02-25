"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/common/header";
import Footer from "@/common/footer";
import Header from "@/common/components/header/Header";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const isProductsRoute =
    pathname === "/products" || pathname.startsWith("/products/");


  const headerAllowed =
    isProductsRoute ||
    pathname === "/profile" ||
    pathname === "/cart" ||
    pathname === "/address" ||
    pathname === "/shipping" ||
    pathname === "/payment" ||
    pathname === "/reviews" ||
    pathname === "/completed";

  return (
    <>
      {!isProductsRoute && <Navbar />}

      {headerAllowed && <Header />}

      {children}

      <Footer />
    </>
  );
}