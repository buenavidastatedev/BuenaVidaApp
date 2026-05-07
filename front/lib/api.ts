export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3003/api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function getStorageWithToken() {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem(ACCESS_TOKEN_KEY)) return localStorage;
  if (sessionStorage.getItem(ACCESS_TOKEN_KEY)) return sessionStorage;
  return null;
}

function getToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    null
  );
}

function saveTokens(
  accessToken: string,
  refreshToken: string,
  remember = true,
) {
  if (typeof window === "undefined") return;

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function clearTokens() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

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

  return result;
}

export async function logoutRequest() {
  const token = getToken();

  if (!token) {
    clearTokens();
    throw new Error("No hay sesión activa");
  }

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  clearTokens();

  if (!res.ok) {
    const result = await res.json().catch(() => null);
    throw new Error(result?.message || "Error al cerrar sesión");
  }

  return res.json();
}

/* =========================
   BASE FETCH (NO TOCAR)
========================= */

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();

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
    const refreshToken =
      localStorage.getItem(REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      clearTokens();
      window.location.href = "/login";
      return;
    }

    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      clearTokens();
      window.location.href = "/login";
      return;
    }

    const newTokens = await refreshRes.json();

    const storage = getStorageWithToken() || localStorage;
    storage.setItem(ACCESS_TOKEN_KEY, newTokens.accessToken);
    storage.setItem(REFRESH_TOKEN_KEY, newTokens.refreshToken);

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
