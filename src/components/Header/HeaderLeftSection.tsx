import Logo from "../Logo/Logo";
import { Fade as Hamburger } from "hamburger-react";
import NavLinks from "../NavLinks/NavLinks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobCanvas } from "@/store/reducers/offcanvasSlice";

const HeaderLeftSection = () => {
  const isOffCanvasOpen = useAppSelector(state => state.offcanvas.isMobOffcanvasOpen);
  const dispatch = useAppDispatch();

  const toggleOffcanvas = () => {
    dispatch(setMobCanvas(!isOffCanvasOpen));
  }
  return (
    <>
      <div className="block text-black dark:!text-white xl:hidden mr-6">
        <Hamburger toggled={isOffCanvasOpen} toggle={toggleOffcanvas} />
      </div>
      <div className="flex items-center">
        <Logo />
        <div className="hidden 2xl:block">
          <ul className="flex gap-x-5">
            <NavLinks classes="text-black dark:!text-white text-lg" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeaderLeftSection;
