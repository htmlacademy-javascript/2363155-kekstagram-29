import { isEscapeKey } from '../utils.js';
import { resetScaleValue } from './scale.js';
import { hidenSlider, addEffect, removeEffects } from './slider.js';
import { openModal, closeModal } from '../popup.js';
const submitButton = document.querySelector('.img-upload__submit');
const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const formElement = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const normalizeString = (str) => str.trim().split(' ').filter((tag) => Boolean(tag.length));
const VALIDATOR_PARAMS = {
  hashtagSymbols: {
    isValid: (value) => normalizeString(value).every((tag) => VALID_SYMBOLS.test(tag)),
    errorText: 'The hashtag should start with the sign #'
  },
  hashtagUnique: {
    isValid: (value) => {
      const uniqHashtags = normalizeString(value).map((tag) => tag.toLowerCase());
      return uniqHashtags.length === new Set(uniqHashtags).size;
    },
    errorText: 'Hashtags should not be repeated'
  },
  hashtagLength: {
    isValid:  (value) => normalizeString(value).length <= MAX_COUNT_HASHTAGS,
    errorText: `Maximum number of hashtags ${MAX_COUNT_HASHTAGS}`
  },
  descriptionLength: {
    isValid: (value) => value.length <= 140,
    errorText: 'The maximum comment length is 140 characters'
  }
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(
  description,
  VALIDATOR_PARAMS.descriptionLength.isValid,
  VALIDATOR_PARAMS.descriptionLength.errorText
);


pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagUnique.isValid,
  VALIDATOR_PARAMS.hashtagUnique.errorText,
  1,
  true
);

pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagSymbols.isValid,
  VALIDATOR_PARAMS.hashtagSymbols.errorText,
  2,
  true
);

pristine.addValidator(
  hashtag,
  VALIDATOR_PARAMS.hashtagLength.isValid,
  VALIDATOR_PARAMS.hashtagLength.errorText,
  3,
  true
);


form.addEventListener('input', () => {
  submitButton.disabled = !pristine.validate();
});

const onCloseButtonClick = () => {
  form.reset();
  pristine.reset();
  removeEffects();
  resetScaleValue();
  closeModal(formElement, bodyElement);
  document.removeEventListener('keydown', onDocumentKey);
};

const onFormClick = () => {
  hidenSlider();
  openModal(formElement, bodyElement);
  document.addEventListener('keydown', onDocumentKey);
  closeForm.addEventListener('click', onCloseButtonClick);
};

const cancellationOfSending = () => {
  hashtag.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  description.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
};

function onDocumentKey (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
    cancellationOfSending();
  }
}

const initImage = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      // console.log('Отправить');
    }
  });
  input.addEventListener('change', onFormClick);
  addEffect();
};

export { initImage };
