import Toggle from "react-toggle";
import "react-toggle/style.css";
import { FaSun, FaMoon } from "react-icons/fa";

const HeaderThemeToggler = () => {

  const themeToggler = () => {
    const docEl = document.documentElement;

    if (docEl.classList.contains("dark")) {
      docEl.classList.remove("dark");
      return;
    }
    docEl.classList.add("dark");
  };

  return (
    <Toggle
      className="mr-4"
      defaultChecked={true}
      onChange={themeToggler}
      icons={{
        checked: <FaMoon />,
        unchecked: <FaSun className="text-yellow-300" />,
      }}
    />
  );
};

export default HeaderThemeToggler;
