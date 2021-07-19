const typeOfApartmentObj = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const cardNotification = document.querySelector('#card')
  .content
  .querySelector('.popup'); // получаю шаблон формы

const photosObj = cardNotification.querySelector('.popup__photo');

/**
 * Функция заполнения преимуществами объявления
 * @param {Element} featuresElement
 * @param {Array} featuresArray
 * Сначала очищаем featuresElement
 * Затем проходимся по массиву featuresArray и создаем <li>
 * Добавляем необходимые классы и вставляем в featuresElement
 */
function fillFeatures(featuresElement, featuresArray) {
  featuresElement.innerHTML = '';

  featuresArray.forEach((item) => {
    const liElement = document.createElement('li');

    liElement.classList.add('popup__feature', `popup__feature--${item}`);
    featuresElement.appendChild(liElement);
  });
}

/**
 * Функция заполнения фотографий объявления
 * @param {Element} photosElement
 * @param {Array} photosArray
 * Сначала очищаем photosElement
 * Затем проходимся по массиву photosArray и создаем <img> на основе шаблона photosObj
 * Добавляем необходимый src и вставляем в photosElement
 */
function fillImages(photosElement, photosArray) {
  photosElement.innerHTML = '';

  photosArray.forEach((item) => {
    const photoClone = photosObj.cloneNode(true);

    photoClone.src = item;
    photosElement.appendChild(photoClone);
  });
}

/**
 * Функция создания попапа из данных с сервера
 * @param {Object} item - одно объявление из массива данных
 * @returns <article> заполненный данными шаблон - попап объявления
 */
const createPopup = ( item ) => {
  const cardNotificationClone = cardNotification.cloneNode(true);

  item.offer.title !== undefined
    ? cardNotificationClone.querySelector('.popup__title').textContent =
    item.offer.title
    : cardNotificationClone.querySelector('.popup__title').remove();

  item.offer.address !== undefined
    ? cardNotificationClone.querySelector('.popup__text--address').textContent =
    item.offer.address
    : cardNotificationClone.querySelector('.popup__text--address').remove();

  item.offer.price !== undefined
    ? cardNotificationClone.querySelector(
      '.popup__text--price').textContent = `${item.offer.price} ₽/ночь`
    : cardNotificationClone.querySelector(
      '.popup__text--price').remove();
  item.offer.type !== undefined
    ? cardNotificationClone.querySelector('.popup__type').textContent = typeOfApartmentObj[item.offer.type]
    : cardNotificationClone.querySelector('.popup__type').remove();


  item.offer.rooms === undefined || item.offer.guests === undefined
    ? cardNotificationClone.querySelector(
      '.popup__text--capacity').remove()
    : cardNotificationClone.querySelector(
      '.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;

  item.offer.checkin === undefined || item.offer.checkout === undefined
    ? cardNotificationClone.querySelector(
      '.popup__text--time').remove()
    : cardNotificationClone.querySelector(
      '.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  item.offer.features !== undefined
    ? fillFeatures(cardNotificationClone.querySelector('.popup__features'), item.offer.features)
    : cardNotificationClone.querySelector('.popup__features').remove();

  item.offer.photos !== undefined
    ? fillImages(cardNotificationClone.querySelector('.popup__photos'), item.offer.photos)
    : cardNotificationClone.querySelector('.popup__photos').remove();

  item.offer.description !== undefined
    ? cardNotificationClone.querySelector('.popup__description').textContent = item.offer.description
    : cardNotificationClone.querySelector('.popup__description').remove();

  item.author.avatar !== undefined
    ? cardNotificationClone.querySelector('.popup__avatar').src = item.author.avatar
    : cardNotificationClone.querySelector('.popup__avatar').remove();

  return cardNotificationClone;
};

export { createPopup };

