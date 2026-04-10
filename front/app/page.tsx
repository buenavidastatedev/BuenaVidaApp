import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Brands from "@/components/landing/Brands";
import Access from "@/components/landing/Access";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background antialiased">
      <Navbar />

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
