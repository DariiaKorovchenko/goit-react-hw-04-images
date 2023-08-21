import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');
// return createPortal(
//   <div className={css.Overlay}>
//     <div className={css.Modal}>{children}</div>
//   </div>,
//   modalRoot
// );

export function Modal({ toggleModal, children }) {
  const handleKeydownListener = event => {
    if (event.code === 'Escape') {
      toggleModal();
      window.removeEventListener('keydown', handleKeydownListener);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydownListener);
  }, []);

  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
