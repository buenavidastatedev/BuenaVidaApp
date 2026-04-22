import RegisterForm from "./RegisterForm";
import Footer from "../layout/Footer";
import RegisterLeft from "./RegisterLeft";

export default function RegisterLayout() {
  return (
    <div className="bg-surface-bright min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <RegisterLeft />
          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
