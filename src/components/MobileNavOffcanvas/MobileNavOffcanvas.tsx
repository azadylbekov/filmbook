import Offcanvas from "react-bootstrap/Offcanvas";
import NavLinks from "../NavLinks/NavLinks";
import Spinner from 'react-bootstrap/Spinner';


export default function MobileNavOffcanvas({ isOffcanvasOpen, closeOffcanvas, onLogin, isLoginLoading }) {
  return (
    <Offcanvas
      className="!w-[300px] !top-[65px] md:!top-[81px] lg:!top-[77px] bg-black"
      show={isOffcanvasOpen}
      onHide={closeOffcanvas}
    >
      <Offcanvas.Body>
        <div className="mt-3 text-center">
          <ul>
            <NavLinks animationClass="fadeleft" classes=" text-white text-2xl mb-3 inline-block" />
          </ul>
          <button onClick={onLogin} className="green-gradient hover:bg-hover-green duration-300 text-xl mt-2 text-white font-medium px-8 py-1 rounded">
          <div className="w-10">{isLoginLoading ? <Spinner animation="border" size="sm" /> : 'login'}</div>
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
