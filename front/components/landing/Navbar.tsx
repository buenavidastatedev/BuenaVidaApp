"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutRequest } from "@/lib/api";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavLink[];

  ctaLabel?: string;
  ctaHref?: string;

  showLogout?: boolean;

  logoHref?: string;

  className?: string;
};

export default function Navbar({
  links,
  ctaLabel,
  ctaHref,
  showLogout = false,
  logoHref = "/",
  className = "",
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      router.push("/");
    }
  };

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-gray-200
        dark:border-gray-800
        bg-white/90
        dark:bg-black/90
        backdrop-blur-xl
        shadow-sm
        ${className}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link href={logoHref}>
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/buenavida.png"
              alt="Buena Vida Logo"
              width={42}
              height={42}
              className="object-contain"
            />

            <span className="text-xl font-black tracking-tight text-black dark:text-white">
              Buena Vida State
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative
                  text-sm
                  font-semibold
                  transition-colors
                  duration-200

                  ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary"
                  }
                `}
              >
                {link.label}

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-[22px]
                      left-0
                      h-[2px]
                      w-full
                      bg-primary
                      rounded-full
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* CTA */}
          {ctaLabel && ctaHref && (
            <Link href={ctaHref}>
              <button
                className="
                  rounded-xl
                  bg-primary
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-on-primary
                  transition-all
                  hover:scale-[1.02]
                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                {ctaLabel}
              </button>
            </Link>
          )}

          {/* LOGOUT */}
          {showLogout && (
            <button
              onClick={handleLogout}
              className="
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                px-4
                py-2
                text-sm
                font-medium
                text-gray-600
                dark:text-gray-300
                transition-colors
                hover:border-red-400
                hover:text-red-500
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
