import { Modal } from "react-bootstrap";
import TitleContext from "../context/TitleContext";
import { useContext } from "react";

const ModalImp = ({ show, HandleClose, body, footer}) => {

    const title = useContext(TitleContext);

    return(
        <Modal
            show={show}
        >
            <Modal.Header>
                <Modal.Title>
                        {title}
                </Modal.Title>
                <button
                    className="btn btn-close btn-secondary"
                    onClick={HandleClose}
                >
                </button>
            </Modal.Header>
            <Modal.Body>
                    {body}
            </Modal.Body>
            <Modal.Footer>
                    {footer}
            </Modal.Footer>
        </Modal>
    )
}

export default ModalImp;