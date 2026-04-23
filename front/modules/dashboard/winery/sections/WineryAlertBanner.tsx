export default function AlertBanner() {
  return (
    <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4">
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        info
      </span>
      <p className="text-xs font-medium text-on-primary-fixed-variant">
        Recuerda que las liquidaciones se procesan cada martes a las 10:00 AM.
      </p>
    </div>
  );
}
