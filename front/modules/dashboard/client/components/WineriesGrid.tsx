"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  winery: { name: string };
}

export default function WineriesGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border p-6 text-center shadow-sm"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-14 h-14 bg-zinc-100 rounded-xl mx-auto mb-4 object-cover"
              />
            )}

            <p className="font-bold">{product.name}</p>
            <p className="text-sm text-zinc-500">{product.winery.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
