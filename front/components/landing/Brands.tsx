import Image from "next/image";

const brands = [
  { name: "Domiciano", logo: "/Domiciano-negro.png" },
  { name: "Viamonte", logo: "/Viamonte-negro.png" },
  { name: "Lupa", logo: "/Lupa-negro.png" },
  { name: "Albaflor", logo: "/Albaflor-negro.png" },
  { name: "El Tránsito", logo: "/El-Transito-negro.png" },
  { name: "Kalos Wines", logo: "/Logo-Kalos-845x684.jpg" },
  { name: "Psicoanalista", logo: "/El-Psicoanalista-negro.png" },
  { name: "Restinga Gin", logo: "/Restinga-negro.png" },
  { name: "Bira Wines", logo: "/Bira-negro.png" },
  { name: "Juana Larrea", logo: "/Juana-Larrea-negro.png" },
  { name: "La Grey Pastoral", logo: "/La-Grey-Pastoral-negro.png" },
];

export default function Brands() {
  return (
    <section className="py-24 bg-white border-y border-outline-variant">
      {/* 🔥 MÁS ANCHO QUE max-w-7xl */}
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Título */}
        <div className="text-center mb-20">
          <h3 className="text-4xl font-black text-on-background tracking-tighter">
            Marcas que Confían en Nosotros
          </h3>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="
        relative
        h-[220px] 
        bg-gray-50
        flex items-center justify-center
        transition-all duration-300
        hover:scale-105
        group
      "
            >
              {/* borde difuminado */}
              <div className="absolute inset-0 border border-primary/20 opacity-0 group-hover:opacity-100 transition rounded-md" />

              <div className="relative w-full h-full p-10">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                                        16vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
