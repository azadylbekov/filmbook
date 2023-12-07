import Modal from "react-bootstrap/Modal";
import { FaX } from "react-icons/fa6";

export default function TrailerModal({ showTrailer, setShowTrailer, title, trailer }) {
  return (
    <Modal
      show={showTrailer}
      onHide={() => setShowTrailer(false)}
      size="lg"
      centered
      dialogClassName="trailer-modal"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Trailer for {title}
        </Modal.Title>
        <div>
          <button onClick={() => setShowTrailer(false)}>
            <FaX />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {trailer && (
          <iframe
            allow="fullscreen;"
            className="w-full md:h-[600px] h-[300px]"
            width="1200"
            src={`https://www.youtube.com/embed/${trailer.key}`}
          ></iframe>
        )}
      </Modal.Body>
    </Modal>
  );
}
