import Spinner from "react-bootstrap/Spinner";

export default function HomeSliderLoader() {
  return (
    <div className="h-[600px] flex items-center justify-center">
      <Spinner
        className="absolute"
        variant="light"
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
