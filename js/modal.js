import { isEscapeKey } from './utils.js';
import { createPictureModal, moreButton, onMoreButtonClick } from './gallery-modal.js';
import { openModal, closeModal } from './popup.js';


const posts = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const buttonCloseModal = modal.querySelector('.big-picture__cancel');
const body = document.querySelector('body');


const onCloseButtonClick = () => {
  closeModal(modal, body);
  buttonCloseModal.removeEventListener('click', onCloseButtonClick);
  moreButton.removeEventListener('click', onMoreButtonClick);
  document.removeEventListener('keydown', onDocumentKey);
};


const onLinkClick = () => {
  openModal(modal, body);
  document.addEventListener('keydown', onDocumentKey);
  buttonCloseModal.addEventListener('click', onCloseButtonClick);
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    onCloseButtonClick();
  }
}

const renderGallery = (picture) => {
  posts.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    let postId;
    if (target !== null) {
      postId = Number(target.dataset.id);
      const postData = picture.find((post) => post.id === postId);
      evt.preventDefault();

      createPictureModal(postData);
    }
  });
};


export { onLinkClick, renderGallery };

