import { showAlert } from './message.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp', 'avif'];

const fileAvatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const filePhotoChooser = document.querySelector('#images');
const previewPhotos = document.querySelector('.ad-form__photo');

fileAvatarChooser.addEventListener('change', () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  } else {
    showAlert('Выберите файл изображения');
  }
});

filePhotoChooser.addEventListener('change', () => {
  const files = Array.from(filePhotoChooser.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const addPhoto = document.createElement('img');

        addPhoto.src = reader.result;
        addPhoto.classList.add('ad-form__photo-element');

        previewPhotos.appendChild(addPhoto);
      });

      reader.readAsDataURL(file);
    } else {
      showAlert('Выберите графический файл');
    }
  });
});

