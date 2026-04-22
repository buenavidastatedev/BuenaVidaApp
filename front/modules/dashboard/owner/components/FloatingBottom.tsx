export default function FloatingButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-zinc-800 transition-all active:scale-90 group">
        <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
          add
        </span>
      </button>
    </div>
  );
}
