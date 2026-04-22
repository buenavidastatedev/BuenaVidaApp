"use client";
import About from "@/components/landing/About";
import Access from "@/components/landing/Access";
import Brands from "@/components/landing/Brands";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background antialiased">
      <Navbar
        links={[
          { label: "Inicio", href: "#top" },
          { label: "Nuestro Modelo", href: "#nuestro-modelo" },
          { label: "Marcas", href: "#marcas" },
          { label: "Accesos", href: "#accesos" },
        ]}
        ctaLabel="Ingresar"
        ctaHref="/login"
      />

      <main className="pt-16">
        <Hero />
        <About />
        <Brands />
        <Access />
      </main>

      <Footer />
    </div>
  );
}
