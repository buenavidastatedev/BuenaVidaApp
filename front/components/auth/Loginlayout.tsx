import { Suspense } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import Footer from "../layout/Footer";

export default function LoginLayout() {
  return (
    <div className="bg-surface h-full flex flex-col font-body">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-blur-wine">
        <div className="w-full max-w-md px-6 py-12 z-10">
          <LoginHeader />

          <Suspense fallback={<div>Cargando...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
