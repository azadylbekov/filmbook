import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type LayoutProps = {
  main: React.ReactNode;
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <Header />
        <div className="pt-[92px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
