const API_URL = "http://localhost:3003/api";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

/* =========================
   AUTH
========================= */

export async function loginRequest(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Error en login");

  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, result.accessToken);
    localStorage.setItem(REFRESH_KEY, result.refreshToken);
  }

  return result;
}

/* =========================
   BASE FETCH (NO TOCAR)
========================= */

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  if (!token) throw new Error("No hay sesión activa");

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  // 🔁 REFRESH TOKEN AUTOMÁTICO
  if (res.status === 401 && typeof window !== "undefined") {
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const newTokens = await refreshRes.json();

    localStorage.setItem(TOKEN_KEY, newTokens.accessToken);
    localStorage.setItem(REFRESH_KEY, newTokens.refreshToken);

    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${newTokens.accessToken}`,
      },
      cache: "no-store",
    });
  }

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Error en request");

  return result;
}

/* =========================
   TYPES
========================= */

export type DashboardSummary = {
  totalSales: number;
  ordersCount: number;
  productsCount: number;
  lowStockCount: number;
  pendingOrders: number;
  avgOrderValue: number;
};

export type SellerPerformance = {
  name: string;
  percentage: number;
};

/* =========================
   DASHBOARD
========================= */

export const getDashboardSummary = () =>
  fetchWithAuth(`${API_URL}/dashboard/summary`);

export const getSellerPerformance = (): Promise<SellerPerformance[]> =>
  fetchWithAuth(`${API_URL}/dashboard/sellers`);

export const getSettlements = () =>
  fetchWithAuth(`${API_URL}/dashboard/settlements`);

export const getAlerts = () => fetchWithAuth(`${API_URL}/dashboard/alerts`);

export const getTopClients = () =>
  fetchWithAuth(`${API_URL}/dashboard/top-clients`);

export const getStockAlerts = () =>
  fetchWithAuth(`${API_URL}/dashboard/stock-alerts`);

export const getTopProducts = () =>
  fetchWithAuth(`${API_URL}/dashboard/top-products`);

/* =========================
   PRODUCTS
========================= */

export async function getProducts() {
  return fetchWithAuth(`${API_URL}/products`);
}

/* =========================
   CLIENTS
========================= */

export async function getClients() {
  return fetchWithAuth(`${API_URL}/clients`);
}

export async function getClientById(id: string) {
  return fetchWithAuth(`${API_URL}/clients/${id}`);
}

/* =========================
   ORDERS
========================= */

export async function createOrder(data: {
  clientId: string;
  items: { productId: string; quantity: number }[];
}) {
  return fetchWithAuth(`${API_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getOrders() {
  return fetchWithAuth(`${API_URL}/orders`);
}

export async function getOrderById(id: string) {
  return fetchWithAuth(`${API_URL}/orders/${id}`);
}

export async function updateOrder(
  id: string,
  data: Partial<{
    status: string;
    clientId: string;
  }>,
) {
  return fetchWithAuth(`${API_URL}/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: string) {
  return fetchWithAuth(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   ORDER ITEMS
========================= */

export async function getOrderItems() {
  return fetchWithAuth(`${API_URL}/order-items`);
}

export async function getOrderItemsByOrder(orderId: string) {
  return fetchWithAuth(`${API_URL}/order-items?orderId=${orderId}`);
}

/* =========================
   STOCK
========================= */

export async function getStock() {
  return fetchWithAuth(`${API_URL}/stock`);
}

export async function moveStock(data: {
  productId: string;
  quantity: number;
  type: "IN" | "OUT";
}) {
  return fetchWithAuth(`${API_URL}/stock/move`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* =========================
   USER
========================= */

export async function getProfile() {
  return fetchWithAuth(`${API_URL}/auth/profile`);
}
