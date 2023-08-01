import { isEscapeKey } from './utils.js';
import { resetScaleValue } from './form-validator/scale.js';
import { hidenSlider, removeEffects } from './form-validator/slider.js';
import { pristineReset, cancellationOfSending } from './form-validator/form.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');

const closeModalForm = () => {
  form.reset();
  removeEffects();
  resetScaleValue();
  pristineReset();
  formElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKey);
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalForm();
    cancellationOfSending();
  }
}

const onClickButtonClose = () => closeModalForm();

const openModalForm = () => {
  hidenSlider();
  formElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKey);
  closeForm.addEventListener('click', onClickButtonClose);
};

export { openModalForm, closeModalForm };
