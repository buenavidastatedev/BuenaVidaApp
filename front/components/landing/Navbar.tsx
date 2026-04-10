import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 max-w-full bg-white dark:bg-black/100 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Image
          src="/buenavida.png"
          alt="Buena Vida Logo"
          width={90}
          height={90}
          className="object-contain"
        />
        <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
          Buena Vida State
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a
          className="font-inter text-sm font-medium tracking-tight text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 transition-all duration-300 ease-in-out active:opacity-80"
          href="#"
        >
          Inicio
        </a>
        <a
          className="font-inter text-sm font-medium tracking-tight text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          href="#"
        >
          Portafolio
        </a>
        <a
          className="font-inter text-sm font-medium tracking-tight text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          href="#"
        >
          Nosotros
        </a>
        <a
          className="font-inter text-sm font-medium tracking-tight text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          href="#"
        >
          Contacto
        </a>
      </div>
      <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out active:opacity-80 hover:bg-primary/90">
        Ingresar
      </button>
    </nav>
  );
}
