import { isEscapeKey } from './utils.js';
import { createPictureModal, modalMoreButton, onMoreButtonClick } from './gallery-modal.js';

const posts = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const buttonCloseModal = modal.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
  buttonCloseModal.removeEventListener('click', onCloseButtonClick);
  modalMoreButton.removeEventListener('click', onMoreButtonClick);
  document.removeEventListener('keydown', onDocumentKey);
};

const onLinkClick = () => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKey);
  buttonCloseModal.addEventListener('click', onCloseButtonClick);
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    onCloseButtonClick();
  }
}

const renderModal = (pictures) => {
  posts.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    let postId;
    if (target !== null) {
      postId = Number(target.dataset.id);
      const postData = pictures.find((post) => post.id === postId);
      evt.preventDefault();

      createPictureModal(postData);
    }
  });
};

export { onLinkClick, renderModal };
