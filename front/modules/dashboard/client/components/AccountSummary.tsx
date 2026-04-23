export default function AccountSummary() {
  return (
    <section className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl p-8 border shadow-sm">
        <h2 className="text-xl font-bold mb-6">Resumen de Cuenta</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-zinc-500">Saldo Cuenta Corriente</p>
            <p className="text-4xl font-black text-pink-600">$142.500</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">Crédito Disponible</p>
            <p className="text-4xl font-black">$250.000</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold">
            Pagar Saldo
          </button>

          <button className="border px-6 py-3 rounded-xl font-bold">
            Ver Movimientos
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-black text-white p-8 flex flex-col justify-end">
        <p className="text-xs uppercase mb-2">Tienda Exclusiva</p>

        <h3 className="text-2xl font-black mb-4">Selección Premium</h3>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold w-fit">
          Ir a Tienda
        </button>
      </div>
    </section>
  );
}
