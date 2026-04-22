"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  showLogout?: boolean;
};

export default function Navbar({
  links,
  ctaLabel,
  ctaHref,
  showLogout = false,
}: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");

    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (e) {
      console.log(e, "logout sin backend");
    }

    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 max-w-full bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800">
      {/* LOGO */}
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/buenavida.png"
            alt="Buena Vida Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
            Buena Vida State
          </span>
        </div>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              index === 0
                ? "text-sm font-medium text-pink-600 dark:text-pink-400 border-b-2 border-pink-600"
                : "text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* CTA */}
        <Link href={ctaHref}>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm hover:bg-primary/90 transition">
            {ctaLabel}
          </button>
        </Link>

        {/* LOGOUT SOLO SI CORRESPONDE */}
        {showLogout && (
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
