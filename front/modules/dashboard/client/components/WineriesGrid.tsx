const wineries = ["Domiciano", "LUPA", "Albaflor", "Manos Negras", "Zuccardi"];

export default function WineriesGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Nuestras Bodegas</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {wineries.map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl border p-6 text-center shadow-sm"
          >
            <div className="w-14 h-14 bg-zinc-100 rounded-xl mx-auto mb-4" />

            <p className="font-bold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
