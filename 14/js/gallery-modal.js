import { onLinkClick } from './modal.js';
import { createElement } from './utils.js';

const COMMENTS_TO_SHOW = 5;
const modalImage = document.querySelector('.big-picture__img img');
const modalLikesCount = document.querySelector('.likes-count');
const modalCommentsCount = document.querySelector('.comments-count');
const modalDescription = document.querySelector('.social__caption');
const modalMoreButton = document.querySelector('.comments-loader');
const modalCommentsList = document.querySelector('.social__comments');
const modalMoreCommentsButton = document.querySelector('.comment-show');
const modalCountComment = document.querySelector('.comments-count');

let currentComments = [];


const createComment = (avatar, message, name) => {
  const listItem = createElement('li', 'social__comment');
  const image = createElement('img', 'social__picture');
  const text = createElement('p', 'social__text', message);

  const IMAGE_SIZE = 35;

  image.style.width = `${IMAGE_SIZE}px`;
  image.style.heigth = `${IMAGE_SIZE}px`;
  image.src = avatar;
  image.alt = name;

  listItem.append(image, text);
  return listItem;
};

const renderComments = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    fragment.append(commentElement);
  });

  return fragment;
};

const initMoreComments = () => {
  const moreComments = currentComments.slice(modalCommentsList.children.length, modalCommentsList.children.length + COMMENTS_TO_SHOW);
  const renderMoreComments = renderComments(moreComments);
  modalCommentsList.append(renderMoreComments);

  if (currentComments.length === modalCommentsList.children.length) {
    modalMoreButton.classList.add('hidden');
  }

  modalMoreCommentsButton.textContent = modalCommentsList.children.length;
  modalCountComment.textContent = currentComments.length;
};

const onMoreButtonClick = () => initMoreComments();

const showPartComments = (comments) => {
  const toShowComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = renderComments(toShowComments);

  if (toShowComments.length === comments.length) {
    modalMoreButton.classList.add('hidden');
  } else {
    modalMoreButton.classList.remove('hidden');
    modalMoreButton.addEventListener('click', onMoreButtonClick);
  }

  modalCommentsList.append(renderFirstComments);
  modalMoreCommentsButton.textContent = toShowComments.length;
  modalCountComment.textContent = comments.length;
};

const createPictureModal = (data) => {
  const {url, likes, comments, description} = data;
  modalImage.src = url;
  modalLikesCount.textContent = likes;
  modalCommentsCount.textContent = comments.length;
  modalDescription .textContent = description;

  modalCommentsList.innerHTML = '';
  currentComments = comments;
  showPartComments(comments);
  onLinkClick(data);
};

export { createPictureModal, onMoreButtonClick, modalMoreButton};
