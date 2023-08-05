import { isEscapeKey } from './utils.js';
import { resetScaleValue } from './form-validator/scale.js';
import { initEffect } from './form-validator/effect.js';
import { pristineReset, isElementFocused } from './form-validator/form.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const formElement = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('.img-upload__cancel');
const effectList = form.querySelector('.effects__list');
const currentEffect = effectList.querySelector('input:checked').value;

const closeModalForm = () => {
  form.reset();
  resetScaleValue();
  pristineReset();
  formElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFormButton.removeEventListener('click', closeModalForm);
  initEffect(currentEffect);
};

const onCloseFormButtonClick = () => closeModalForm();
const onEffectListChange = (evt) => initEffect(evt.target.value);

const openModalForm = () => {
  initEffect(currentEffect);
  formElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
  effectList.addEventListener('change', onEffectListChange);
};


function onDocumentKeydown (evt) {
  const error = document.querySelector('.error');
  if (isEscapeKey(evt) && !isElementFocused() && !error) {
    evt.preventDefault();
    closeModalForm();
  }
}


export { openModalForm, closeModalForm };
