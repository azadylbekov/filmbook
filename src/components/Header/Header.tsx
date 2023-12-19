import { ToastContainer } from "react-toastify";
import HeaderSearchForm from "./HeaderSearchForm";
import HeaderLeftSection from "./HeaderLeftSection";
import HeaderThemeToggler from "./HeaderThemeToggler";
import HeaderMobSearchButton from "./HeaderMobSearchButton";
import MobileNavOffcanvas from "../MobileNavOffcanvas/MobileNavOffcanvas";
import MobileSearchOffcanvas from "../MobileSearchOffcanvas/MobileSearchOffcanvas";
import Container from "../Container";
import LoginButton from "../LoginButton/LoginButton";

const Header = () => {
  return (
    <header className="bg-[#ffffff] dark:bg-black border-b dark:border-[#3c3c3c] fixed top-0 left-0 right-0 z-50">
      <Container>
        <div className="flex items-center justify-between !py-2 md:!py-4  text-white">
          <div className="flex items-center">
            <HeaderLeftSection />
          </div>
          <div className="flex items-center">
            <HeaderSearchForm />
            <HeaderThemeToggler />
            <LoginButton extraClasses="hidden lg:block " />
            <HeaderMobSearchButton />
          </div>
        </div>
      </Container>
      <MobileNavOffcanvas />
      <MobileSearchOffcanvas />
      <ToastContainer />
    </header>
  );
}

export default Header;
