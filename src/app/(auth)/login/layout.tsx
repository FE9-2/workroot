import Background from "@/app/components/layout/auth/Background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Background>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">{children}</div>
    </Background>
  );
}
