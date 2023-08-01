import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './utils.js';
// Const
const MAX_GENERATED_OBJECT = 25;
const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKE_NUMBER = 15;
const MAX_LIKE_NUMBER = 200;
const MAX_AVATAR_NUMBER = 6;
const MIN_AVATAR_NUMBER = 1;

// Name

const NAMES = [
  'Лев',
  'Ягуар',
  'Пантера',
  'Тигр',
  'Гепард',
  'Каракал',
  'Рысь',
  'Барс',
  'Пума',
  'Леопард'
];

//Description

const DESCRIPTION = [
  'Грация и сила',
  'Нежность и коварство',
  'Пушистик в поле',
  'Скрытатая мощь и огромный вес',
  'Непревзойдённый камуфляж',
  'Самый приспособленный вид',
  'Лучший ловец саванны',
  'Чемпион по нырянию в снег',
  'Прячется на дереве',
  'Погладь кота!'
];

// Comments

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getCommentText = () => Array.from({length: getRandomInteger(1, 3)}, () => getRandomArrayElement(COMMENTS_MESSAGE)).join(' ');

// Create comment

const generateCommentsId = createRandomIdFromRangeGenerator(1, 1000);
const createComment = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomInteger(MAX_AVATAR_NUMBER, MIN_AVATAR_NUMBER)}.svg`,
  message: `${getCommentText()}`,
  name: `${getRandomArrayElement(NAMES)}`
});

// Create post foto

let photoId = 1;
const generatePostsId = createRandomIdFromRangeGenerator(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER);
const createPost = () => ({
  id: generatePostsId(),
  url: `photos/${photoId++}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTION)}`,
  likes: getRandomInteger(MIN_LIKE_NUMBER, MAX_LIKE_NUMBER),
  comments: Array.from({ length: getRandomInteger(0, MAX_GENERATED_OBJECT) }, createComment)
});

const createPostsData = Array.from({ length: MAX_GENERATED_OBJECT }, createPost);
//const createPostsData = ! generatePhotoId
export { createPostsData };

