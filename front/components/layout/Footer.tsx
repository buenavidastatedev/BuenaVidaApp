import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-black dark:bg-zinc-950 border-t border-zinc-800">
      <Link href="/">
        <div className="flex items-center gap-4">
          <Image
            src="/buenavida.png"
            alt="Buena Vida Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <p className="font-inter text-xs uppercase tracking-widest text-gray-400">
            © 2026 Buena Vida S.A. Representante comercial Exclusivo
          </p>
        </div>
      </Link>
      <div className="flex gap-6">
        <div className="w-10 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-pink-600 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-xl">share</span>
        </div>
        <div className="w-10 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:bg-pink-600 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-xl">mail</span>
        </div>
      </div>
    </footer>
  );
}
