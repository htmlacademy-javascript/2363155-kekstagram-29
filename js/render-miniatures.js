import { createPosts } from './data.js';
//Найти шаблон и селектор с фото
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postList = document.querySelector('.pictures');

// Массив сгенирированных данных. Перебор и добавление данных
const similarPosts = createPosts();
const postListFragment = document.createDocumentFragment();
similarPosts.forEach(({ url, description, likes, comments }) => {
  const postItem = postTemplate.cloneNode(true);
  postItem.querySelector('.picture__img').src = url;
  postItem.querySelector('.picture__img').alt = description;
  postItem.querySelector('.picture__likes').textContent = likes;
  postItem.querySelector('.picture__comments').textContent = comments.length;
  //Добавить в элемент
  postListFragment.append(postItem);
});
//Добавить в фрагмент
postList.append(postListFragment);
