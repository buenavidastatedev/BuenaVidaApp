export default function WelcomeHeader() {
  return (
    <section className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black">
          Bienvenido, Distribuidora Central
        </h1>

        <p className="text-zinc-500">
          Revisá el estado de tu cuenta y pedidos.
        </p>
      </div>

      <div className="text-right text-sm text-zinc-500">
        Último acceso
        <br />
        Hoy 10:45 AM
      </div>
    </section>
  );
}
