type AlertsData = {
  pendingOrders: number;
  lowStock: number;
};

type Props = {
  data: AlertsData;
};

export default function Alerts({ data }: Props) {
  return (
    <div className="bg-error-container/30 border border-error/20 p-4 rounded-xl flex items-center gap-4">
      <span className="material-symbols-outlined text-error">warning</span>

      <div className="flex-1">
        <p className="text-sm font-bold text-on-error-container">
          Alertas de Pedidos
        </p>

        <p className="text-xs text-on-error-container/80">
          {data.pendingOrders} órdenes pendientes requieren atención.
        </p>

        <p className="text-xs text-on-error-container/80">
          {data.lowStock} productos con stock crítico.
        </p>
      </div>

      <button className="text-xs font-bold text-error underline">
        Revisar Ahora
      </button>
    </div>
  );
}
