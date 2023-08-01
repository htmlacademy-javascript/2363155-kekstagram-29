import { onLinkClick } from './modal.js';
import { createElemet } from './utils.js';

const modalImage = document.querySelector('.big-picture__img img');
const modalLikesCount = document.querySelector('.likes-count');
const modalCommentsCount = document.querySelector('.comments-count');
const modalDescription = document.querySelector('.social__caption');
const moreButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const showComment = document.querySelector('.comment-show');
const countComment = document.querySelector('.comments-count');
const COMMENTS_TO_SHOW = 5;
let currentComments = [];


const createComment = (avatar, message, name) => {
  const listItem = createElemet('li', 'social__comment');
  const image = createElemet('img', 'social__picture');
  const text = createElemet('p', 'social__text', message);

  const imageSize = 35;

  image.src = avatar;
  image.alt = name;
  image.style.width = `${imageSize}px`;
  image.style.heigth = `${imageSize}px`;

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
  const moreComments = currentComments.slice(commentsList.children.length, commentsList.children.length + COMMENTS_TO_SHOW);
  const renderMoreComments = renderComments(moreComments);
  commentsList.append(renderMoreComments);

  if (currentComments.length === commentsList.children.length) {
    moreButton.classList.add('hidden');
  }

  showComment.textContent = commentsList.children.length;
  countComment.textContent = currentComments.length;
};

const onMoreButtonClick = () => initMoreComments();

const initPartComments = (comments) => {
  const toShowComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = renderComments(toShowComments);

  if (toShowComments.length === comments.length) {
    moreButton.classList.add('hidden');
  } else {
    moreButton.classList.remove('hidden');
    moreButton.addEventListener('click', onMoreButtonClick);
  }

  commentsList.append(renderFirstComments);
  showComment.textContent = toShowComments.length;
  countComment.textContent = comments.length;
};

const createPictureModal = (data) => {
  const {url, likes, comments, description} = data;
  modalImage.src = url;
  modalLikesCount.textContent = likes;
  modalCommentsCount.textContent = comments.length;
  modalDescription .textContent = description;

  commentsList.innerHTML = '';
  currentComments = comments;
  initPartComments(comments);
  onLinkClick(data);
};

export { createPictureModal, onMoreButtonClick, moreButton};
