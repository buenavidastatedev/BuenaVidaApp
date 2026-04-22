import Image from "next/image";

export default function RegisterLeft() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center h-full text-center">
      <div className="space-y-4 flex flex-col items-center">
        <Image
          src="/buenavida.png"
          alt="Buena Vida Logo"
          width={300}
          height={300}
          className="object-contain"
        />

        <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight">
          Eleva tu <span className="text-primary">negocio vinícola</span> al
          siguiente nivel.
        </h1>

        <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
          Únete a nuestra red de representación exclusiva y conecta con los
          mejores productores y distribuidores del mercado.
        </p>
      </div>
    </div>
  );
}
