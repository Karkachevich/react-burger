import React, { FC} from "react";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      title="Закрыть модальное окно"
    ></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
