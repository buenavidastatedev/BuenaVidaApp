"use client";

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  region: string;
  image: string;
  capacity: number;
};

export const warehouse: Warehouse[] = [
  {
    id: "1",
    name: "Viamonte Winery",
    location: "Mendoza, AR",
    region: "VISALBA",
    image: "/viamonte-portfolio.png",
    capacity: 50.7,
  },
  {
    id: "2",
    name: "El Psicoanalista WINES",
    location: "Mendoza, AR",
    region: "VALLE DE UCO",
    image: "/el-psicoanalista-portfolio.jpg",
    capacity: 62,
  },
  {
    id: "3",
    name: "Domiciano",
    location: "Mendoza, AR",
    region: "COQUIMBO, MAIPÚ",
    image: "/domiciano-portfolio.png",
    capacity: 78,
  },
];

export default function WarehouseSection() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-primary">
            Rendimiento de Bodegas
          </h3>

          <p className="text-sm text-[#94a3b8] font-medium">
            Seguimiento de capacidad en tiempo real por regiones
          </p>
        </div>

        <button className="text-sm font-bold text-primary hover:underline underline-offset-4">
          Ver Todo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouse.map((w) => (
          <div
            key={w.id}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={w.image}
                alt={w.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-700 tracking-tight">
                {w.region}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-slate-900">{w.name}</h4>
                  <p className="text-xs text-slate-500">{w.location}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-primary">
                    {w.capacity}%
                  </p>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${w.capacity}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
