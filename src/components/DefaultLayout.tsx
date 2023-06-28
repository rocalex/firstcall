import MainNav from "./MainNav";

interface LayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <>
      <MainNav />
      <div className="container">{children}</div>
    </>
  );
}
