import Spinner from "react-bootstrap/Spinner";
import useLogin from "@/hooks/useLogin";
import { FC } from "react";

interface LoginButtonProps {
  extraClasses?: string
}

const LoginButton: FC<LoginButtonProps> = ({ extraClasses }) => {
  const [onLogin, isLoginLoading] = useLogin();

  const onLoginClick = () => {
    onLogin();
  };

  return (
    <button
      onClick={onLoginClick}
      className={
        "green-gradient hover:bg-hover-green duration-300 text-white font-medium px-8 py-1 rounded " +
        extraClasses
      }
    >
      <div className="w-10">
        {isLoginLoading ? <Spinner animation="border" size="sm" /> : "login"}
      </div>
    </button>
  );
};

export default LoginButton;
