"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginForm() {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md mx-auto w-full">
      {/* Identity Anchor */}
      <div className="flex flex-col items-center lg:items-start mb-10">
        <div className="flex items-center justify-center gap-3 px-2 mb-8 w-full">
          <Image
            src="/buenavida.png"
            alt="VintageFlow Logo"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
          Bienvenido de nuevo
        </h1>

        <p className="text-sm text-[#000] font-medium">
          Ingresa tus credenciales para acceder al sistema
        </p>
      </div>

      {/* FORM */}
      <div style={{ pointerEvents: "none" }}>
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const res = await fetch("http://localhost:3003/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });

              if (!res.ok) throw new Error("Error al iniciar sesión");

              const data = await res.json();

              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);

              window.location.href = "/admin";
            } catch (error) {
              console.error(error);
              alert("Credenciales incorrectas");
            } finally {
              setLoading(false);
            }
          }}
        >
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="block text-sm text-[#de1a4e] font-semibold text-on-surface-variant">
              Correo electrónico
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">
                mail
              </span>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring[#de1a4e] focus:border-transparent outline-none transition-all placeholder:text-outline/60 text-on-surface"
                placeholder="ejemplo@correo.com"
                type="email"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm text-[#de1a4e] font-semibold text-on-surface-variant">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* CHECK */}
          <div className="flex items-center gap-2 py-2">
            <input className="w-4 h-4 text-[#de1a4e]" type="checkbox" />
            <label className="text-sm text-[#000] text-on-surface-variant">
              Recordar mi sesión
            </label>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[#de1a4e] hover:bg-pink-700 active:scale-[0.98] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#de1a4e]/20 transition-all duration-200 flex items-center justify-center gap-2 text-lg"
            type="submit"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
            <span className="material-symbols-outlined">login</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-grow border-t border-outline-variant/50"></div>
            <span className="block text-sm text-[#de1a4e] font-semibold text-on-surface-variant">
              O continuar con
            </span>
            <div className="flex-grow border-t border-outline-variant/50"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => {
              console.log("CLICK GOOGLE");
              window.location.href = "http://localhost:3003/api/auth/google";
            }}
            style={{
              position: "relative",
              zIndex: 9999,
              pointerEvents: "auto",
            }}
            className="w-full hover:bg-slate-50 border border-outline-variant active:scale-[0.98] text-on-surface text-[#de1a4e] font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            Continuar con Google
          </button>
        </form>
      </div>
      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
        <p className="text-on-surface-variant text-sm text-[#000]">
          ¿No tienes una cuenta? <br />
          <a className="font-bold text-[#de1a4e] hover:underline">
            Registrate!
          </a>
        </p>
      </div>
    </div>
  );
}
