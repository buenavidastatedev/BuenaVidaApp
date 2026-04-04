import Image from "next/image";
export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-[#fcf9f8] border-r border-[#e1bfbb]/15 flex flex-col space-y-2 pt-20">
      <div className="flex items-center gap-3 px-2 mb-8">
        <Image
          src="/buenavida.png"
          alt="VintageFlow Logo"
          width={70}
          height={70}
          className="object-contain"
        />

        <span className="text-lg font-black tracking-tight text-primary">
          Buena Vida
        </span>
      </div>
      <div className="px-2 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
          <img
            alt="Usuario Administrador"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHHywDKsUwGeaupMmQdCPHV80b8sRtQ3tZp-ryUzHDMk6KNlUsI5LIBqpgh-9SH_An5_vOjHGopzSCZia_qqAgtv02GfUt58jOjkX8FfXQYcb8ycor_P89B_xZk-JjEqP2GF6j9_wxyMWj2xS3frOtU4LzGaUcx0oucPFql_IEJUz2Trz8QnjWwE0-7Ae-EPCHO_sLnwM6O5h5bhIKQ4Wa1Dbon03STpPhY-6u2al9ehEi9JMTKT8I4D0XYEB7y_WcaTVluZtkZw"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Sumiller Jefe</p>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
            Admin Global
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <a
          className="flex items-center gap-3 bg-blue-50 text-primary px-4 py-3 rounded-lg font-bold transition-all"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="dashboard">
            dashboard
          </span>
          <span className="text-sm">Resumen</span>
        </a>
        <a
          className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-50 hover:text-primary rounded-lg transition-all"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="inventory_2">
            inventory_2
          </span>
          <span className="text-sm">Bodegas</span>
        </a>
        <a
          className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-50 hover:text-primary rounded-lg transition-all"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="analytics">
            analytics
          </span>
          <span className="text-sm">Portafolio</span>
        </a>
        <a
          className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-50 hover:text-primary rounded-lg transition-all"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            data-icon="account_balance_wallet"
          >
            account_balance_wallet
          </span>
          <span className="text-sm">Libro Mayor</span>
        </a>
        <a
          className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-50 hover:text-primary rounded-lg transition-all"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="shopping_bag">
            shopping_bag
          </span>
          <span className="text-sm">Portal de Clientes</span>
        </a>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Capacidad de Cava
            </p>
            <p className="text-[10px] font-bold text-primary">82%</p>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[82%]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
