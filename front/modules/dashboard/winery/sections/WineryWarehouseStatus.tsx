export default function WarehouseStatus() {
  return (
    <div className="md:col-span-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="text-lg font-semibold mb-2">Estado del Depósito</h4>
        <p className="text-slate-400 text-sm">Capacidad actual utilizada</p>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-bold">78%</span>
          <span className="text-success text-sm mb-1">Operativo</span>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-[78%]"></div>
        </div>
      </div>

      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
    </div>
  );
}
