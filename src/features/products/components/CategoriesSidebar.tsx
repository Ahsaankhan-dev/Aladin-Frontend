import Link from "next/link";
import { categories } from "../data";

export default function CategoriesSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white">
      <div className="rounded bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[16px] font-bold text-slate-800">
            Categories
          </span>
        </div>

        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block text-[12px] font-semibold text-slate-500 hover:text-[#0B8BA6]"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}