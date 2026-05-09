import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "D" },
  { href: "/dashboard/audit", label: "Website Audit", icon: "A" },
  { href: "/dashboard/research", label: "Market Research", icon: "R" },
  { href: "/dashboard/competitors", label: "Competitor Scanner", icon: "C" },
  { href: "/dashboard/landing-page", label: "Landing Page Generator", icon: "L" },
  { href: "/dashboard/images", label: "Product Image Optimizer", icon: "I" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "N" }
];

export function Sidebar() {
  return (
    <aside className="border-b border-line bg-white md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-line px-5 py-5">
          <Link href="/" className="block text-lg font-semibold text-ink">
            LocalBoost AI
          </Link>
          <p className="mt-1 text-sm text-slate-500">Growth workspace</p>
        </div>
        <nav className="grid gap-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-mist hover:text-ink"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-mist text-xs font-bold text-teal">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <div className="rounded-lg border border-line bg-mist p-4 text-sm text-slate-600">
            Mock data only. AI providers stay server-side when enabled.
          </div>
        </div>
      </div>
    </aside>
  );
}
