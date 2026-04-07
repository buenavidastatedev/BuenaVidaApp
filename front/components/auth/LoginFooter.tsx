import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-36 bg-background border-slate-600">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-6">
        {/* LOGO + NOMBRE */}
        <div className="flex items-center gap-2">
          <Image
            src="/buenavida.png"
            alt="Buena Vida Logo"
            width={100}
            height={100}
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
