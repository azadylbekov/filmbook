import Container from "../Container";
import Spinner from "react-bootstrap/Spinner";


export default function MovieGridUILoader() {
  return (
    <Container>
      <div className="md:h-[400px] h-[250px] flex items-center justify-center">
      <Spinner
        variant="light"
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
			</div>
    </Container>
  );
}
