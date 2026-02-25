import Link from "next/link";
import Container from "../layout/Container";

const links = [
  { label: "Customer Service", href: "/help" },
  { label: "Aladdin Basics", href: "/basics" },
  { label: "Best sells", href: "/products" },
  { label: "Today's Deals", href: "/deals" },
  { label: "Fashion", href: "/fashion" },
  { label: "New Arrivals", href: "/new" },
  { label: "Aladdin Privacy", href: "/privacy" },
  { label: "Aladdin Help", href: "/support" },
];

export default function SubNav() {
  return (
    <div className="bg-[#82d4e4]">
      <Container className="flex h-10 items-center justify-between">
        <nav className="flex items-center gap-4 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-[12px] font-semibold text-black hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/promo/black-history-month"
          className="hidden rounded px-3 py-1 text-[13px] font-semibold text-black md:inline-flex"
        >
          Black History Month
        </Link>
      </Container>
    </div>
  );
}