import { useRouteError, Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col text-white">
      <h1 className="text-4xl mb-3">Oops!</h1>
      <p className="text-3xl mb-3">Sorry, an unexpected error has occurred.</p>
      <p className="text-2xl mb-3">
        <i>{error?.statusText || error?.message}</i>
      </p>
			<Link to="/" className="text-2xl text-white flex items-center">
				<FaAngleLeft />
				<span className="ml-2">Go back to home page</span>
			</Link>
    </div>
  );
}