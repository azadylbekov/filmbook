import Spinner from "react-bootstrap/Spinner";

export default function MovieShowLoader() {
  return (
    <div>
      <div className="pb-[45%] relative">
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Spinner variant="light" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
}
