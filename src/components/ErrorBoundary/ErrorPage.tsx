import { Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container>
      <div className="mt-4 dark:text-[#ffffff] text-[#000000] text-center">
        <h2 className="text-2xl mb-2">Sorry something went wrong</h2>
        <h3 className="text-2xl">Try reloading the page</h3>
      </div>
    </Container>
  );
};

export default ErrorPage;
