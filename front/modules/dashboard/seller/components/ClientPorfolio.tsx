// src/modules/dashboard/seller/components/ClientPortfolio.tsx

const clients = [
  {
    name: "Vinoteca El Garage",
    zone: "Palermo, CABA",
    debt: "$145.200",
    visit: "Hace 4 días",
  },
  {
    name: "Restó La Cascada",
    zone: "San Isidro, PBA",
    debt: "$0",
    visit: "Ayer",
  },
  {
    name: "Bar de Tapas Sol",
    zone: "Recoleta, CABA",
    debt: "$32.400",
    visit: "Hace 1 semana",
  },
];

export default function ClientPortfolio() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
      <div className="p-6 border-b border-zinc-200 flex justify-between">
        <h2 className="font-bold text-lg">Cartera de Clientes</h2>

        <button className="text-pink-600 text-sm font-bold">Ver todos</button>
      </div>

      <div className="divide-y divide-zinc-200">
        {clients.map((client) => (
          <div
            key={client.name}
            className="p-4 flex items-center justify-between hover:bg-zinc-50"
          >
            <div>
              <h3 className="font-bold">{client.name}</h3>
              <p className="text-xs text-zinc-500">{client.zone}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">{client.debt}</p>
              <p className="text-xs text-zinc-500">{client.visit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
