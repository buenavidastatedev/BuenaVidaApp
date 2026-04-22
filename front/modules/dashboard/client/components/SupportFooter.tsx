export default function SupportFooter() {
  return (
    <footer className="bg-black text-white rounded-2xl p-8 flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold">¿Necesitás ayuda?</h3>

        <p className="text-zinc-400">
          Roberto Gómez está disponible para ayudarte.
        </p>
      </div>

      <div className="flex gap-4">
        <button className="border border-white px-5 py-3 rounded-xl">
          Email
        </button>

        <button className="bg-pink-600 px-5 py-3 rounded-xl font-bold">
          Llamar
        </button>
      </div>
    </footer>
  );
}
