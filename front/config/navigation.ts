// /config/navigation.ts

export type Role = "winery" | "seller" | "client" | "owner";

export const navigationByRole = {
  winery: {
    links: [
      { label: "Dashboard", href: "/dashboard/winery" },
      { label: "Pedidos", href: "/dashboard/winery/orders" },
      { label: "Stock", href: "/dashboard/winery/stock" },
    ],
    ctaLabel: "Nuevo Producto",
    ctaHref: "/dashboard/winery/create",
    showLogout: true,
  },

  seller: {
    links: [
      { label: "Dashboard", href: "/dashboard/seller" },
      { label: "Ventas", href: "/dashboard/seller/sales" },
      { label: "Clientes", href: "/dashboard/seller/clients" },
    ],
    ctaLabel: "Nueva Venta",
    ctaHref: "/dashboard/seller/new",
    showLogout: true,
  },

  client: {
    links: [
      { label: "Inicio", href: "#top" },
      { label: "Mis Pedidos", href: "/dashboard/client/orders" },
    ],
    ctaLabel: "Comprar",
    ctaHref: "/shop",
    showLogout: true,
  },

  owner: {
    links: [
      { label: "Resumen", href: "/dashboard/owner" },
      { label: "Ventas", href: "/dashboard/owner/sales" },
      { label: "Stock", href: "/dashboard/owner/stock" },
    ],
    ctaLabel: "Admin",
    ctaHref: "/dashboard/owner/admin",
    showLogout: true,
  },
};
