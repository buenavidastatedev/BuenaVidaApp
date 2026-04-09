import Image from "next/image";

export default function RegisterHeader() {
  return (
    <header className="flex flex-col items-center text-center gap-4">
      <Image
        src="/buenavida.png"
        alt="Buena Vida Logo"
        width={100}
        height={100}
        className="object-contain"
      />

      <div className="space-y-1">
        <h1 className="text-lg font-black tracking-tight text-primary">
          Buena Vida
        </h1>
        <h2 className="text-2xl font-bold text-on-surface-variant">
          Crear una cuenta
        </h2>
        <p className="text-on-surface-variant/70 text-sm max-w-[280px] mx-auto">
          Únete a la red más exclusiva de gestión de bodegas
        </p>
      </div>
    </header>
  );
}
