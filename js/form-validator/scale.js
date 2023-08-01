const modalElement = document.querySelector('.img-upload__scale');
const minusButtonScale = modalElement.querySelector('.scale__control--smaller');
const plusButtonScale = modalElement.querySelector('.scale__control--bigger');
const fieldValue = modalElement.querySelector('.scale__control--value');
const modalImage = document.querySelector('.img-upload__preview img');
const STEP = 20;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
let scaleValue = MAX_SCALE;

const setScaleValue = () => {
  modalImage.style.transform = `scale(${scaleValue / 100})`;
  fieldValue.value = `${scaleValue}%`;
};

const resetScaleValue = () => {
  scaleValue = MAX_SCALE;
  setScaleValue();
};

const onScaleButtonMinus = () => {
  scaleValue = Math.max(scaleValue - STEP, MIN_SCALE);
  setScaleValue();
};

const onScaleButtoPlus = () => {
  scaleValue = Math.min(scaleValue + STEP, MAX_SCALE);
  setScaleValue();
};

minusButtonScale.addEventListener('click', onScaleButtonMinus);
plusButtonScale.addEventListener('click', onScaleButtoPlus);

export { resetScaleValue };
