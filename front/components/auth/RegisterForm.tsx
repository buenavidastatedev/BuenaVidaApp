"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [role, setRole] = useState<string>("cliente");
  const [show, setShow] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [type === "email" ? "email" : type === "password" ? "password" : name]:
        value,
    });
  };

  const mapRole = (role: string) => {
    switch (role) {
      case "admin":
        return "admin";
      case "bodega":
        return "cellar_manager";
      case "distribuidor":
        return "seller";
      default:
        return "client";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [firstName, ...rest] = form.name.split(" ");
    const lastname = rest.join(" ") || "User";

    try {
      const res = await fetch("http://localhost:3003/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          firstName,
          lastname,
          password: form.password,
          role: mapRole(role),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // Guardar tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Redirección simple (ajustás después por rol)
      window.location.href = "/admin";
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Error al registrarse");
      } else {
        alert("Error al registrarse");
      }
    }
  };

  return (
    <section
      className="bg-surface border border-outline-variant/30 rounded-xl p-8 shadow-sm bg-cover bg-center"
      style={{ backgroundImage: "url('/imagenlogin.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 backdrop-blur-sm bg-white/80 p-6 rounded-xl"
      >
        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">
            Nombre completo
          </label>

          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              person
            </span>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg"
              placeholder="John Doe"
              type="text"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface-variant">
            Correo electrónico
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              mail
            </span>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg"
              placeholder="ejemplo@correo.com"
              type="email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface-variant">
            Contraseña
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              lock
            </span>

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={show ? "text" : "password"}
              placeholder="********"
              className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg"
              required
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>

        {/* ROLES */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">
            Tipo de cuenta
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "admin", label: "Admin" },
              { value: "cellar_manager", label: "Bodega" },
              { value: "seller", label: "Distribuidor" },
              { value: "client", label: "Cliente" },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`py-2 rounded-lg border text-sm font-medium
                  ${
                    role === r.value
                      ? "bg-primary text-white border-primary"
                      : "border-outline-variant text-on-surface-variant"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          className="w-full bg-primary-container text-on-primary-container font-bold py-4 rounded-lg"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </section>
  );
}
