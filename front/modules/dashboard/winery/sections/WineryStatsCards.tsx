export default function StatsCards() {
  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl">
          <span className="material-symbols-outlined text-blue-600 text-3xl">
            payments
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-secondary">Ventas Netas</p>
          <h3 className="text-2xl font-bold">$1.240.500</h3>
          <span className="text-xs text-success font-medium">
            +12% vs mes anterior
          </span>
        </div>
      </div>

      <div className="bg-white  p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <div className="bg-primary/5 p-4 rounded-2xl">
          <span className="material-symbols-outlined text-primary text-3xl">
            account_balance_wallet
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-secondary">Saldo a Cobrar</p>
          <h3 className="text-2xl font-bold">$385.200</h3>
        </div>
      </div>
    </>
  );
}
