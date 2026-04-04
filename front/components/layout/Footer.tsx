import Image from "next/image";

export default function Footer() {
  return (
    <footer className="md:ml-64 h-16 bg-background border-t border-slate-800">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* LOGO + NOMBRE */}
        <div className="flex items-center gap-2">
          <Image
            src="/buenavida.png"
            alt="Buena Vida Logo"
            width={50}
            height={50}
            className="object-contain"
          />

          <span className="text-sm font-bold tracking-tight text-primary">
            Buena Vida
          </span>
        </div>

        {/* COPYRIGHT */}
        <p className="text-[14px] text-secondary">
          © 2026 Buena Vida. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
