"use client";

import { useRouter } from "next/navigation";

const orders = [
  { id: "94821", status: "En Camino" },
  { id: "94755", status: "Preparado" },
];

export default function OrdersSection() {
  const router = useRouter();

  return (
    <section>
      {/* HEADER CON BOTÓN */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Seguimiento de Pedidos</h2>

        <button
          onClick={() => router.push("/dashboard/client/orders/new")}
          className="bg-pink-600 text-white px-5 py-2 rounded-xl font-bold"
        >
          Nuevo Pedido
        </button>
      </div>

      {/* LISTADO */}
      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border p-6 shadow-sm"
          >
            <p className="text-xs text-zinc-500">PEDIDO #{order.id}</p>

            <h3 className="text-xl font-bold mt-2">{order.status}</h3>

            <div className="w-full h-2 bg-zinc-100 rounded-full mt-6">
              <div className="w-2/3 h-full bg-pink-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
