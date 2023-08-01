const EFFECTS = {
  chrome: {
    createFilter: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    createFilter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    createFilter: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    createFilter: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    createFilter: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    step: 0.1
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const modalImage = document.querySelector('.img-upload__preview img');
const sliderList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const hidenSlider = () => {
  sliderContainer.classList.add('hidden');
};

const removeEffects = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  hidenSlider();
  modalImage.style.filter = 'none';
};

const addEffect = () => {
  sliderList.addEventListener('change', (evt) => {
    removeEffects();
    if (evt.target.value === 'none') {
      return;
    }

    const effect = EFFECTS[evt.target.value];

    noUiSlider.create(sliderElement, {
      range: {
        min: effect.min,
        max: effect.max
      },
      start: effect.max,
      step: effect.step,
      connect: 'lower',
      format: {
        to: (value) => value,
        from: (value) => parseFloat(value, 10)
      }
    });


    sliderElement.noUiSlider.on('update', () => {
      const saturationEffect = sliderElement.noUiSlider.get();
      modalImage.style.filter = effect.createFilter(saturationEffect);
      valueElement.value = saturationEffect;
    });
    sliderContainer.classList.remove('hidden');
  });
};

export { hidenSlider, addEffect, removeEffects };
