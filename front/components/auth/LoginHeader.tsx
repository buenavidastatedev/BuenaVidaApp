import Image from "next/image";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center mb-10">
      <Image
        src="/buenavida.png"
        alt="Buena Vida Logo"
        width={120}
        height={120}
        className="object-contain"
      />

      <div className="text-center">
        <h1 className="text-2xl font-headline font-extrabold text-on-surface tracking-tight">
          Acceso al Ecosistema
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Plataforma de gestión vinícola profesional
        </p>
      </div>
    </div>
  );
}
