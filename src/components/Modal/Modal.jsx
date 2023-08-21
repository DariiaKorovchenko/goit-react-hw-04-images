import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ toggleModal, children }) {
  const handleKeydownListener = event => {
    if (event.code === 'Escape') {
      toggleModal();
      window.removeEventListener('keydown', handleKeydownListener);
    }
  };

  window.addEventListener('keydown', handleKeydownListener);

  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
