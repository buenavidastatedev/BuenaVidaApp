import Image from "next/image";

export default function About() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl inline-block">
            <Image
              src="/Buena-Vida-Home.jpeg"
              alt="Cava de vinos de lujo con estanterías de madera y luz cálida"
              width={800}
              height={800}
              className="object-contain"
            />
          </div>

          <div className="absolute -bottom-20 -right-5 bg-primary p-5 rounded-2xl text-white hidden lg:block shadow-xl">
            <span className="text-4xl font-black block">10+</span>
            <span className="text-sm uppercase tracking-widest font-bold">
              Años de Excelencia
            </span>
          </div>
        </div>
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Nuestro Modelo
          </span>
          <h2 className="text-4xl font-black text-on-surface mb-6 tracking-tight">
            Más que representante comercial, somos su socio estratégico.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
            Buena Vida no opera bajo el esquema tradicional de distribución.
            Actuamos como el brazo comercial exclusivo, vendiendo{" "}
            <strong>por cuenta y orden</strong> de marcas de prestigio.
          </p>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Nuestra misión es conectar la pasión de las bodegas con los puntos
            de venta más exigentes de Buenos Aires, garantizando integridad en
            la cadena de valor y excelencia en el servicio.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-on-surface font-semibold">
              <span className="material-symbols-outlined text-primary fill-icon">
                check_circle
              </span>
              Facturación directa desde bodega
            </li>
            <li className="flex items-center gap-3 text-on-surface font-semibold">
              <span className="material-symbols-outlined text-primary fill-icon">
                check_circle
              </span>
              Gestión logística optimizada
            </li>
            <li className="flex items-center gap-3 text-on-surface font-semibold">
              <span className="material-symbols-outlined text-primary fill-icon">
                check_circle
              </span>
              Posicionamiento de marca premium
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
