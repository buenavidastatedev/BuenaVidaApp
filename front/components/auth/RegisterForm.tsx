"use client";

"use client";

import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();

  const [role, setRole] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mapRole = (role: string) => {
    switch (role) {
      case "owner":
        return "owner";

      case "winery":
        return "winery";

      case "seller":
        return "seller";

      default:
        return "client";
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return false;
    }

    if (!form.email.trim()) {
      alert("El email es obligatorio");
      return false;
    }

    if (!form.password.trim()) {
      alert("La contraseña es obligatoria");
      return false;
    }

    if (form.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (!role) {
      alert("Seleccioná un rol");
      return false;
    }

    const validRoles = ["owner", "winery", "seller", "client"];

    if (!validRoles.includes(role)) {
      alert("Rol inválido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: form.email.trim(),
        firstname: form.name.trim(),
        password: form.password,
        role: mapRole(role),
      };

      console.log("REGISTER PAYLOAD:", payload);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      if (!res.ok) {
        if (Array.isArray(data.message)) {
          throw new Error(data.message.join(", "));
        }

        throw new Error(data.message || "Error al registrarse");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      router.push(`/dashboard/${data.user.role}`);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-zinc-100 p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PERSONAL */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-primary pl-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Información Personal
            </span>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-zinc-700">
              Nombre completo
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                person
              </span>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Ej. Juan Pérez"
                required
              />
            </div>
          </div>
        </div>

        {/* CONTACTO */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-4 border-zinc-400 pl-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Datos de Contacto
            </span>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-zinc-700">
              Email
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                mail
              </span>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="email@empresa.com"
                required
              />
            </div>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-zinc-700">
            Contraseña
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              lock
            </span>

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={show ? "text" : "password"}
              className="w-full pl-10 pr-12 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-primary outline-none"
              placeholder="********"
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <span className="material-symbols-outlined">
                {show ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* ROLES */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Tipo de Usuario
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "owner", label: "Propietario" },
              { value: "winery", label: "Bodega" },
              { value: "seller", label: "Vendedor" },
              { value: "client", label: "Cliente" },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => {
                  console.log("ROL SELECCIONADO:", r.value);
                  setRole(r.value);
                }}
                className={`p-3 border rounded-lg text-sm font-medium transition
                  ${
                    role === r.value
                      ? "bg-primary text-white border-primary"
                      : "border-zinc-300 hover:bg-zinc-50"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? "Creando cuenta..." : "Crear Cuenta"}

          {!loading && (
            <span className="material-symbols-outlined">arrow_forward</span>
          )}
        </button>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30">
          <p className="text-center text-sm text-on-surface-variant">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-bold text-primary hover:text-primary-container transition-colors"
            >
              Inicia sesión!
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
