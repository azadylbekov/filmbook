import React, { FC } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <Header />
        <div className="pt-[65px] lg:!pt-[77px] md:!pt-[81px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
