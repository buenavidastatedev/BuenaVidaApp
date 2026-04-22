"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginRequest } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 👉 role que viene desde /login?role=seller etc
  const selectedRole = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const redirectByRole = (role: string) => {
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
  };

  // 👉 LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginRequest({ email, password });

      // guardar tokens
      if (remember) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
      }

      const backendRole = data.user.role;

      // 👉 validar si intenta entrar con otro perfil
      if (selectedRole && selectedRole !== backendRole) {
        alert("Este usuario no pertenece al perfil seleccionado.");
        setLoading(false);
        return;
      }

      redirectByRole(backendRole);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 shadow-xl rounded-xl p-8 backdrop-blur-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* PERFIL */}
        {selectedRole && (
          <div className="bg-primary/10 text-primary text-sm font-bold px-4 py-3 rounded-lg">
            Perfil seleccionado: {selectedRole.toUpperCase()}
          </div>
        )}

        {/* EMAIL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Email Corporativo
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="nombre@empresa.com"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Contraseña
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg pr-12"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* REMEMBER */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span className="text-sm">Recordar sesión</span>
        </div>

        {/* LOGIN */}
        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* GOOGLE */}
        <button
          type="button"
          disabled={loadingGoogle}
          onClick={() => {
            setLoadingGoogle(true);
            window.location.assign(
              `http://localhost:3003/api/auth/google${
                selectedRole ? `?role=${selectedRole}` : ""
              }`,
            );
          }}
          className="w-full border py-3 rounded-lg font-medium"
        >
          {loadingGoogle ? "Redirigiendo..." : "Continuar con Google"}
        </button>
      </form>

      {/* REGISTER */}
      <div className="mt-8 pt-6 border-t">
        <p className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() =>
              router.push(
                selectedRole ? `/register?role=${selectedRole}` : "/register",
              )
            }
            className="font-bold text-primary"
          >
            Registrate
          </button>
        </p>
      </div>
    </div>
  );
}
