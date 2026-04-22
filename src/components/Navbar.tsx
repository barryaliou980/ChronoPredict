"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-xl tracking-tight leading-none mb-0.5">
                ChronoPredict
              </span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase opacity-80">
                Health Insights
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {[
                { name: "Accueil", href: "/" },
                { name: "Analyse", href: "/predict" },
                { name: "A propos", href: "/about" },
                { name: "Docs", href: "/docs" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 py-2 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>
            
            <Link
              href="/predict"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-primary transition-all duration-300 shadow-sm"
            >
              Démarrer l'Analyse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
