export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-r from-lime-200 to-lime-300 px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
