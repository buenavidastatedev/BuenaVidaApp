"use client";

import { useEffect, useState } from "react";
import { getProducts, getClients, createOrder } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  price: number;
};

type Client = {
  id: string;
  name: string;
};

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function ClientOrdersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, clientsData] = await Promise.all([
          getProducts(),
          getClients(),
        ]);

        setProducts(productsData);
        setClients(clientsData);

        if (clientsData.length > 0) {
          setSelectedClient(clientsData[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addProduct = (product: Product) => {
    const existing = items.find((i) => i.productId === product.id);

    if (existing) {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCreateOrder = async () => {
    try {
      await createOrder({
        clientId: selectedClient,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      alert("✅ Pedido creado");
      setItems([]);
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear pedido");
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Nuevo Pedido</h1>

      <select
        className="border p-2 rounded w-full"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-3 gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => addProduct(p)}
            className="border p-3 rounded cursor-pointer"
          >
            {p.name} - ${p.price}
          </div>
        ))}
      </div>

      <div>Total: ${total}</div>

      <button onClick={handleCreateOrder}>Crear Pedido</button>
    </div>
  );
}
