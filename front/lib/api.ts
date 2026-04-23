const API_URL = "http://localhost:3003/api";
const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

/* =========================
   AUTH
========================= */
export async function loginRequest(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error en login");
  }

  // 🔥 Guardar tokens correctamente
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, result.accessToken);
    localStorage.setItem(REFRESH_KEY, result.refreshToken);
  }

  return result;
}

/* =========================
   FETCH BASE (CLAVE)
========================= */
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  if (!token) {
    throw new Error("No hay sesión activa");
  }

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  // 🔥 Manejo de token expirado
  if (res.status === 401) {
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    // 🔁 retry request original
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

  if (!res.ok) {
    throw new Error(result.message || "Error en request");
  }

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

/* =========================
   DASHBOARD
========================= */
export async function getDashboardSummary() {
  return fetchWithAuth(`${API_URL}/dashboard/summary`);
}

export async function getStockAlerts() {
  return fetchWithAuth(`${API_URL}/dashboard/stock-alerts`);
}

export async function getTopProducts() {
  return fetchWithAuth(`${API_URL}/dashboard/top-products`);
}
