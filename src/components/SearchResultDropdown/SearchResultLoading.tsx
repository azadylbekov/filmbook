import Spinner from "react-bootstrap/Spinner";


export default function SearchResultLoading() {
  return (
    <div className="text-center">
      <Spinner
        variant="light"
        animation="border"
        role="status"
      ></Spinner>
    </div>
  );
}
