import Spinner from "react-bootstrap/Spinner";


export default function ScrollLoader() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <Spinner variant="light" animation="border" role="status"></Spinner>
    </div>
  );
}
