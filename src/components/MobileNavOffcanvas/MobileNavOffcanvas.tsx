import Offcanvas from "react-bootstrap/Offcanvas";
import NavLinks from "../NavLinks/NavLinks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobCanvas } from "@/store/reducers/offcanvasSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";

const MobileNavOffcanvas = () => {
  const dispatch = useAppDispatch();
  const isOffCanvasOpen = useAppSelector(
    (state) => state.offcanvas.isMobOffcanvasOpen
  );
  const location = useLocation();

  const closeOffcanvas = () => {
    dispatch(setMobCanvas(false));
  };

  useEffect(() => {
    closeOffcanvas();
  }, [location.pathname]);

  return (
    <Offcanvas
      className="!w-[300px] !top-[65px] md:!top-[81px] lg:!top-[77px] bg-[#ffffff] dark:bg-black"
      show={isOffCanvasOpen}
      onHide={closeOffcanvas}
    >
      <Offcanvas.Body>
        <div className="mt-3 text-center">
          <ul>
            <NavLinks
              animationClass="fadeleft"
              classes=" text-[#010101] dark:text-[#fefefe] text-2xl mb-3 inline-block"
            />
          </ul>
          <div className="">
            <LoginButton />
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MobileNavOffcanvas;
