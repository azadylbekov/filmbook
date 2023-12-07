import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <h2 className="logo-title hidden sm:block mr-6 mb-0">
          Film<span>Book</span>
        </h2>
        <h2 className="logo-title block sm:hidden mr-6 mb-0">
          F<span>B</span>
        </h2>
      </Link>
    </div>
  );
}
