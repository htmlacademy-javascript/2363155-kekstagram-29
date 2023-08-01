import { renderThumbnails } from './gallery.js';
import { renderModal } from './modal.js';
import { setFormSubmit } from './form-validator/form.js';
import { getData, sendData } from './api.js';
import { debounce, showAlert } from './utils.js';
import { closeModalForm } from './upload.js';
import { showMessageError, showMessageSuccess } from './message.js';
import { initFilters } from './filters.js';

setFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModalForm();
    showMessageSuccess();
  } catch {
    showMessageError();
  }
});

try {
  const data = await getData();
  const debounceGallery = debounce(renderThumbnails);
  initFilters(data, debounceGallery);
  renderThumbnails(data);
  renderModal(data);
} catch (err) {
  showAlert(err.message);
}

