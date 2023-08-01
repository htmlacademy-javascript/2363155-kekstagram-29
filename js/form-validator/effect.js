const EFFECTS = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  default: {
    min: 0,
    max: 1,
    step: 1
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const modalImage = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const setStateEffects = (value) => {
  if(value === 'none' || !value) {
    sliderContainer.classList.add('hidden');
    modalImage.style.filter = 'none';
    return;
  }
  sliderContainer.classList.remove('hidden');
};

const createSlider = (effect) => {
  const { name, min, max, step, unit} = EFFECTS[effect] || EFFECTS.default;

  noUiSlider.create(sliderElement, {
    range: {
      min,
      max
    },
    start: max,
    step: step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    const saturationEffect = sliderElement.noUiSlider.get();
    modalImage.style.filter = `${name}(${saturationEffect}${unit})`;
    valueElement.value = saturationEffect;
  });
};

const initEffect = (effect) => {
  if(sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  setStateEffects(effect);
  createSlider(effect);
};

export { initEffect };
