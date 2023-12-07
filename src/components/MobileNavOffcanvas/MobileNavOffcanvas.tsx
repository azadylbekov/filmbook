import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavLinks from "../NavLinks/NavLinks";

export default function MobileNavOffcanvas({ isOffcanvasOpen, closeOffcanvas }) {
  return (
    <Offcanvas
      className="!w-[300px] !top-[96px] bg-black"
      show={isOffcanvasOpen}
      onHide={closeOffcanvas}
    >
      <Offcanvas.Body>
        <div className="mt-3 text-center">
          <ul>
            <NavLinks classes=" text-white text-2xl mb-3 inline-block" />
          </ul>
          <button className="green-gradient hover:bg-hover-green duration-300 text-xl mt-2 text-white font-medium px-8 py-1 rounded">
            login
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
