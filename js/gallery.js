const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const post = postTemplate.cloneNode(true);
  post.setAttribute('data-id', id);
  post.querySelector('.picture__img').src = url;
  post.querySelector('.picture__img').alt = description;
  post.querySelector('.picture__likes').textContent = likes;
  post.querySelector('.picture__comments').textContent = comments.length;

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
