"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Access() {
  const router = useRouter();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* 🔥 IMAGEN DE FONDO */}
      <Image
        src="/imagenlogin.jpg"
        alt="Fondo acceso"
        fill
        className="object-cover"
        priority
      />

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 CONTENIDO */}
      <div
        id="accesos"
        className="relative z-10 max-w-7xl mx-auto scroll-mt-28"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
            Acceso al Ecosistema
          </h2>
          <p className="text-white/80 text-lg">
            Seleccione su perfil para ingresar a la plataforma de gestión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* CARD 1 */}
          <div
            onClick={() => router.push("/login?role=owner")}
            className="group bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-outline-variant hover:border-primary cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  corporate_fare
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-3">
                Gestion Buena Vida State
              </h3>

              <p className="text-on-surface-variant text-sm leading-relaxed">
                Control total de operaciones, métricas de ventas y gestión de
                portafolio.
              </p>
            </div>

            <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
              Ingresar
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            onClick={() => router.push("/login?role=winery")}
            className="group bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-outline-variant hover:border-primary cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-secondary-fixed rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  precision_manufacturing
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-3">
                Gestion Bodegas
              </h3>

              <p className="text-on-surface-variant text-sm leading-relaxed">
                Monitoreo de pedidos, stock en tiempo real y reportes de
                facturación.
              </p>
            </div>

            <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
              Ingresar
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            onClick={() => router.push("/login?role=seller")}
            className="group bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-outline-variant hover:border-primary cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-tertiary-fixed rounded-xl flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  badge
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-3">
                Gestion Vendedor
              </h3>

              <p className="text-on-surface-variant text-sm leading-relaxed">
                Gestión de cartera de clientes, toma de pedidos y seguimiento de
                objetivos.
              </p>
            </div>

            <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
              Ingresar
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </div>
          </div>

          {/* CARD 4 */}
          <div
            onClick={() => router.push("/login?role=client")}
            className="group bg-primary/90 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-primary cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  shopping_basket
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Cliente Mayorista
              </h3>

              <p className="text-white/80 text-sm leading-relaxed">
                Vinotecas y gastronomía. Realice sus pedidos directos a bodega
                de forma ágil.
              </p>
            </div>

            <div className="mt-8 flex items-center text-white font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
              Tienda B2B
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
