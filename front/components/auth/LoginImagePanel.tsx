import Image from "next/image";

export default function ImagePanel() {
  return (
    <div className="hidden lg:block relative overflow-hidden group">
      <Image
        alt="Vintage Wine Cellar"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src="/imagenlogin.jpg"
        width={800}
        height={600}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-[#de1a4e]/40 backdrop-blur-[2px]"></div>

      <div className="absolute bottom-12 left-12 right-12 text-white">
        <h2 className="text-4xl font-bold mb-4 tracking-tight leading-tight">
          Gestión inteligente para bodegas exclusivas.
        </h2>
        <p className="text-lg opacity-90 font-light">
          Control total sobre su inventario, catas y distribución en una sola
          plataforma elegante.
        </p>
      </div>
    </div>
  );
}
