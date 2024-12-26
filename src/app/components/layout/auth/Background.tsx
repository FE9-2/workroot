export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[64px] flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-r from-primary-orange-100 to-primary-orange-200 px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
