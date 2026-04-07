"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [role, setRole] = useState("cliente");
  const [show, setShow] = useState(false);

  return (
    <section className="bg-surface border border-outline-variant/30 rounded-xl p-8 shadow-sm">
      <form className="flex flex-col gap-5">
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
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline/50"
              placeholder="John Doe"
              type="text"
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
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-[#de1a4e] focus:border-transparent outline-none transition-all placeholder:text-outline/60 text-on-surface"
              placeholder="ejemplo@correo.com"
              type="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-on-surface-variant">
              Contraseña
            </label>

            <a className="text-sm font-medium text-[#000] hover:text-pink-700 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
              lock
            </span>

            <input
              type={show ? "text" : "password"}
              placeholder="********"
              className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-[#1978e5] focus:border-transparent outline-none transition-all placeholder:text-outline/60 text-on-surface"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors p-1"
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
              { value: "bodega", label: "Bodega" },
              { value: "distribuidor", label: "Distribuidor" },
              { value: "cliente", label: "Cliente" },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`py-2 rounded-lg border text-sm font-medium transition-all
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

        {/* Checkbox */}
        <div className="flex items-center gap-3 mt-1">
          <input
            className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
            type="checkbox"
          />

          <label className="text-sm text-on-surface-variant">
            Acepto los{" "}
            <span className="text-primary font-medium hover:underline">
              términos y condiciones
            </span>
          </label>
        </div>

        {/* Button */}
        <button
          className="w-full bg-primary-container text-on-primary-container font-bold py-4 rounded-lg shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-4"
          type="submit"
        >
          Registrarse
          <span className="material-symbols-outlined text-xl">
            arrow_forward
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/40"></div>
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-4 text-outline font-medium tracking-widest">
            O continuar con
          </span>
        </div>
      </div>

      {/* Google */}
      <button className="w-full flex items-center justify-center gap-3 bg-surface border border-outline-variant py-3.5 rounded-lg hover:bg-surface-container-low transition-colors active:scale-[0.98]">
        <span className="text-on-surface font-semibold text-sm">
          Continuar con Google
        </span>
      </button>
    </section>
  );
}
