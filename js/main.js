import { renderThumbnail } from './gallery.js';
import { createPostsData } from './data.js';
import { renderGallery } from './modal.js';
import { initImage } from './form-validator/form.js';
//import { initImage } from './validator/form.js';

renderThumbnail(createPostsData);
renderGallery(createPostsData);
initImage();
