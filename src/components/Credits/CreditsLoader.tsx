import Container from "../Container";
import Spinner from "react-bootstrap/Spinner";


export default function CreditsLoader() {
  return (
    <Container>
      <div className="h-40 flex items-center justify-center">
        <Spinner variant="light" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Container>
  );
}
