"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/common/header";
import Footer from "@/common/footer";
import Header from "@/common/components/header/Header";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProductsRoute =
    pathname === "/shop" || pathname.startsWith("/shop/");


  const useAppHeader =
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
      {!useAppHeader && <Navbar />}

      {useAppHeader && <Header />}

      {children}

      <Footer />
    </>
  );
}