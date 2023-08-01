import { openPictureModal } from './modal.js';
import { createElemet } from './utils.js';

const bigPictureImg = document.querySelector('.big-picture__img img');
const likeCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.comments-count');
const commentsDescription = document.querySelector('.social__caption');
const loadButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const blockCount = document.querySelector('.social__comment-count');
const COMMENTS_TO_SHOW = 5;


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

const renderComments = (commentsData) => {
  const fragment = document.createDocumentFragment();
  commentsData.forEach(({ avatar, message, name }) => {
    const commentElement = createComment(avatar, message, name);
    fragment.append(commentElement);
  });

  return fragment;
};

const initFirstComments = (comments) => {
  const showComments = comments.slice(0, COMMENTS_TO_SHOW);
  const renderFirstComments = renderComments(showComments);


  commentsList.append(renderFirstComments);

  loadButton.addEventListener('click', (items) => {
    commentsList.append(...items).map(renderComments);
  });
  blockCount.firstChild.textContent = `${showComments.length} из `;
};

const loadMore = () => {

};


const createPictureModal = (postData) => {
  const {url, likes, comments, description} = postData;
  bigPictureImg.src = url;
  likeCount.textContent = likes;
  commentCount.textContent = comments.length;
  commentsDescription.textContent = description;

  commentsList.innerHTML = '';
  initFirstComments(comments);

  openPictureModal(postData);
};

export { createPictureModal, renderComments };
