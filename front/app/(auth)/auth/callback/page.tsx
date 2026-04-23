"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 👉 decodificar JWT
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      const role = payload.role;

      // 👉 redirección por rol
      switch (role) {
        case "owner":
          router.push("/dashboard/owner");
          break;

        case "seller":
          router.push("/dashboard/seller");
          break;

        case "winery":
          router.push("/dashboard/winery");
          break;

        case "client":
          router.push("/dashboard/client");
          break;

        default:
          router.push("/");
      }
    }
  }, [router]);

  return <p>Iniciando sesión...</p>;
}
