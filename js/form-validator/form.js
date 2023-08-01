import { addEffect} from './slider.js';
import { openModalForm } from '../upload.js';
const submitButton = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');
const input = form.querySelector('.img-upload__input');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const normalizeString = (str) => str.trim().split(' ').filter((tag) => Boolean(tag.length));
const VALIDATOR_PARAMS = {
  hashtagSymbols: {
    isValid: (value) => normalizeString(value).every((tag) => VALID_SYMBOLS.test(tag)),
    errorText: 'Хэштег начинается с #'
  },
  hashtagUnique: {
    isValid: (value) => {
      const uniqHashtags = normalizeString(value).map((tag) => tag.toLowerCase());
      return uniqHashtags.length === new Set(uniqHashtags).size;
    },
    errorText: 'Хэштеги не должны повторяться'
  },
  hashtagLength: {
    isValid:  (value) => normalizeString(value).length <= MAX_COUNT_HASHTAGS,
    errorText: `Максимум Хэштегов ${MAX_COUNT_HASHTAGS}`
  },
  descriptionLength: {
    isValid: (value) => value.length <= 140,
    errorText: 'Комментарий не более 140 символов'
  }
};
const SubmitButtonText = {
  DEFAULT: 'Отправить',
  LOADING: 'Отправляю...'
};


const onClickButtonForm = () => openModalForm();

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

const pristineReset = () => pristine.reset();

form.addEventListener('input', () => {
  submitButton.disabled = !pristine.validate();
});

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

const toggleSubmit = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.LOADING : SubmitButtonText.DEFAULT;
};
const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmit(true);
      await onSuccess(new FormData(form));
      toggleSubmit();
    }
  });

  input.addEventListener('change', onClickButtonForm);
  addEffect();
};

export { setFormSubmit, pristineReset, cancellationOfSending };
