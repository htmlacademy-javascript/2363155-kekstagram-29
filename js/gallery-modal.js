import { openPictureModal, modal } from './modal.js';
import { createElemet } from './utils.js';

const showCount = document.querySelector('.social__comment-count');
const moreButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
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

const initPartComments = (comments) => {
  const toShowComments = comments.slice(0, COMMENTS_TO_SHOW,);
  const renderFirstComments = renderComments(toShowComments);

  if (toShowComments.length === comments.length) {
    moreButton.classList.add('hidden');
  } else {
    moreButton.classList.remove('hidden');
  }

  commentsList.append(renderFirstComments);
  showCount.firstChild.textContent = `${toShowComments.length} из `;
};

const loadMore = () => {
  const moreComments = currentComments.slice(commentsList.children.length, commentsList.children.length + COMMENTS_TO_SHOW);
  const renderMoreComments = renderComments(moreComments);
  commentsList.append(renderMoreComments);

  if (currentComments.length === commentsList.children.length) {
    moreButton.classList.add('hidden');
  }

  showCount.firstChild.textContent = `${commentsList.children.length} из `;
};

const createPictureModal = (data) => {
  const {url, likes, comments, description} = data;
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.likes-count').textContent = likes;
  modal.querySelector('.comments-count').textContent = comments.length;
  modal.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  currentComments = comments;
  moreButton.addEventListener('click', loadMore);
  initPartComments (comments);
  openPictureModal(data);
};

export { createPictureModal };
