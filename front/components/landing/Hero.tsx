import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[751px] flex items-center justify-end overflow-hidden">
      {/* 🖼️ IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Banner-Buena-Vida.jpg"
          alt="Banner Buena Vida"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_left]"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🧾 TEXTO */}
      <div className="relative z-10 w-full flex justify-end px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-snug">
            <span className="text-primary drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Buena Vida State
            </span>{" "}
            Representación Comercial Exclusiva de Bodegas Argentinas
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light mb-10">
            Llevamos la excelencia de las mejores marcas a AMBA y PBA con un
            modelo de gestión directa y eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              Acceder al Sistema
              <span className="material-symbols-outlined">login</span>
            </button>

            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
