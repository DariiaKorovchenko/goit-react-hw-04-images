import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem(id, largeImage, description, preview) {
  const [modalStatus, setModalStatus] = useState(false);

  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <li className={css.ImageGalleryItem} id={id} onClick={() => toggleModal()}>
      <img
        src={preview}
        alt={description}
        className={css.ImageGalleryItem_image}
      />
      {modalStatus && (
        <Modal toggleModal={toggleModal}>
          <div className={css.Overlay}>
            <div className={css.Modal}>
              <img src={largeImage} alt={description} />
            </div>
          </div>
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};
