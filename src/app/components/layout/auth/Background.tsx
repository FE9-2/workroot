export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[64px] flex min-h-[calc(100vh-64px)] items-center justify-center bg-primary-blue-50 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
