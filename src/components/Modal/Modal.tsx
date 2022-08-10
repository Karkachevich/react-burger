import ReactDOM from "react-dom";
import React, { FC, ReactNode} from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export interface IModalProps {
  header?: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<IModalProps> = ({ children, header, onClose }) => {
  const reactModalsPlaceholder = document.getElementById("modals");

  React.useEffect(() => {
    const closeModal = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  }, [onClose]);

  return reactModalsPlaceholder && ReactDOM.createPortal(
    (<>
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
    </>),
    reactModalsPlaceholder,
  );
};



export default Modal;
