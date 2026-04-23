// src/modules/dashboard/seller/components/FollowUpTasks.tsx

const tasks = [
  "Cobranza pendiente Vinoteca X",
  "Visita programada CABA",
  "Revisar stock de BIRA en cliente",
];

export default function FollowUpTasks() {
  return (
    <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 h-full">
      <h2 className="font-bold text-lg mb-6">Seguimientos</h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task}
            className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-pink-500"
          >
            <p className="font-semibold">{task}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-3 border-2 border-dashed border-zinc-300 rounded-xl text-sm font-medium">
        + Nueva Tarea
      </button>
    </div>
  );
}
