import { isEscapeKey } from './utils.js';
import { postsData } from './data.js';
import { createPictureModal } from './gallery-modal.js';

const posts = document.querySelector('.pictures');
const modal = document.querySelector('.big-picture');
const closeModal = modal.querySelector('.big-picture__cancel');

const closePictureModal = () => {
  modal.classList.add('hidden');
  closeModal.removeEventListener('click', closePictureModal);

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKey);
};


const openPictureModal = () => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKey);
  closeModal.addEventListener('click', closePictureModal);

  document.body.classList.add('modal-open');
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

posts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let postId;

  if (target !== null) {
    postId = Number(target.dataset.id);
    const postData = postsData.find((post) => post.id === postId);

    createPictureModal(postData);
  }
});

export { openPictureModal, modal };

