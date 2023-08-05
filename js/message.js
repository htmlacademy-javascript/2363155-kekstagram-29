const thumbnailError = document.querySelector('#error').content.querySelector('.error');

const thumbnailSuccess = document.querySelector('#success').content.querySelector('.success');

const body = document.querySelector('body');

const hideMessage = () => {
  const element = document.querySelector('.error') || document.querySelector('.success');
  element.remove();
  document.removeEventListener('keydown', onDocumentKey);
  body.removeEventListener('click', onBodyClick);
};
const onClickButtonHide = () => hideMessage();

const showMessage = (messageElement, closeButtonClick) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKey);
  body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClick).addEventListener('click', onClickButtonHide);
};

function onBodyClick(evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showErrorMessage = () => showMessage(thumbnailError, '.error__button');
const showSuccessMessage = () => showMessage(thumbnailSuccess, '.success__button');

export { showErrorMessage, showSuccessMessage };
