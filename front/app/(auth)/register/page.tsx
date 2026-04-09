import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginFooter from "@/components/auth/LoginFooter";

export default function RegisterPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-[440px] flex flex-col gap-8">
        <RegisterHeader />

        <RegisterForm />
      </main>
      <LoginFooter />
    </div>
  );
}
