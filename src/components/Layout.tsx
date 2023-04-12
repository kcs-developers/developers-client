type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <main className="p-6 w-full md:max-w-[1140px] m-auto">{children}</main>
    </div>
  );
};

export default Layout;
