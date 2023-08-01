const postTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const post = postTemplate.cloneNode(true);
  post.setAttribute('data-id', id);
  post.querySelector('.picture__img').src = url;//Добавляем ссылку на фото
  post.querySelector('.picture__img').alt = description;//Описание фото
  post.querySelector('.picture__likes').textContent = likes;//Число лайков
  post.querySelector('.picture__comments').textContent = comments.length;//Число комментариев

  return post;
};

const renderThumbnail = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const post = createThumbnail(picture);
    fragment.append(post);
  });
  container.append(fragment);
};

export { renderThumbnail };
