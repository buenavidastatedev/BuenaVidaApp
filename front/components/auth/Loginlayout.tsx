import LoginImagePanel from "./LoginImagePanel";
import LoginForm from "./LoginForm";

export default function LoginLayout() {
  return (
    <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant/30">
        <LoginImagePanel />

        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
