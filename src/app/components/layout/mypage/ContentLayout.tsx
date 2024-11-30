interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="container mx-auto min-h-screen px-4 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">{children}</div>
    </div>
  );
};

export default ContentLayout;
