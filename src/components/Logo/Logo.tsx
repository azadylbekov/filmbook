import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <h2 className="logo-title text-black dark:!text-white hidden sm:block mr-6 mb-0">
          Film<span>Book</span>
        </h2>
        <h2 className="logo-title text-black dark:!text-white block sm:hidden mr-6 mb-0">
          F<span>B</span>
        </h2>
      </Link>
    </div>
  );
}

export default Logo;
