import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const Modal = ({ children, header, onClose }) => {
  React.useEffect(() => {
    const closeModal = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={`${style.modal} p-10`}>
        <div className={style.modal__header}>
          <p className="text text_type_main-large">
            {header}
          </p>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        <div>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
