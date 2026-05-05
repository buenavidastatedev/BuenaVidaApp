"use client";

import { useEffect, useState } from "react";
import { createOrder, getProducts, getProfile } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function NewOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<
    { productId: string; quantity: number; product: Product }[]
  >([]);

  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 cargar productos reales
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };

    loadProducts();
  }, []);

  // 🔹 cargar usuario
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProducts();
        const profile = await getProfile();
        setClientId(profile.client?.id);
        console.log("PRODUCTS:", data); // ✅ ACÁ
      } catch (e) {
        console.error(e);
      }
    };

    loadProfile();
  }, []);

  const addToCart = (product: Product) => {
    const exists = cart.find((c) => c.productId === product.id);

    if (exists) {
      setCart((prev) =>
        prev.map((c) =>
          c.productId === product.id ? { ...c, quantity: c.quantity + 1 } : c,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        { productId: product.id, quantity: 1, product },
      ]);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.product.price),
    0,
  );

  const handleCreateOrder = async () => {
    if (!clientId) return alert("No se pudo identificar el cliente");

    try {
      setLoading(true);

      await createOrder({
        clientId,
        items: cart.map((c) => ({
          productId: c.productId,
          quantity: c.quantity,
        })),
      });

      alert("Pedido creado correctamente");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Error al crear pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-black">Nuevo Pedido</h1>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-pink-600 font-bold">${Number(product.price)}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-4">Carrito</h2>

        {cart.length === 0 && <p>No hay productos</p>}

        {cart.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <span>{item.product.name}</span>
            <span>
              {item.quantity} x ${Number(item.product.price)}
            </span>
          </div>
        ))}

        <div className="mt-4 font-bold text-lg">Total: ${total}</div>

        <button
          onClick={handleCreateOrder}
          disabled={loading || cart.length === 0}
          className="mt-4 bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Creando..." : "Confirmar Pedido"}
        </button>
      </div>
    </div>
  );
}
