import { createNearestPlaces } from './data.js';
// import { typeOfApartmentObj } from './data.js';

const cardNotification = document
  .querySelector('#card')
  .content
  .querySelector('.popup'); // получаю шаблон формы


// const cardNotificationСanvas = document.querySelector('.map__canvas'); // нахожу, куда буду передавать заполненные данными шаблоны
// cardNotificationСanvas.classList.add('visually-hidden');

const similarCards = createNearestPlaces();

function fillFeatures(featuresElement, featuresArray) {
  featuresElement.innerHTML = '';

  featuresArray.forEach((item) => {
    const liElement = document.createElement('li');

    liElement.classList.add('popup__feature', `popup__feature--${item}`);
    featuresElement.appendChild(liElement);
  });
}

// const photosDiv = cardNotification.querySelector('.popup__photos');
const photosObj = cardNotification.querySelector('.popup__photo');

function fillImages(photosElement, photosArray) {
  photosElement.innerHTML = '';

  photosArray.forEach((item) => {
    const photoClone = photosObj.cloneNode(true);

    photoClone.src = item;
    photosElement.appendChild(photoClone);
  });
}

// similarCards.forEach((item) => {
//   const cardNotificationClone = cardNotification.cloneNode(true);

//   item.offer.title !== undefined
//     ? cardNotificationClone.querySelector('.popup__title').textContent =
//     item.offer.title
//     : cardNotificationClone.querySelector('.popup__title').remove();

//   item.offer.address !== undefined
//     ? cardNotificationClone.querySelector('.popup__text--address').textContent =
//     item.offer.address
//     : cardNotificationClone.querySelector('.popup__text--address').remove();

//   item.offer.price !== undefined
//     ? cardNotificationClone.querySelector(
//       '.popup__text--price').textContent = `${item.offer.price} ₽/ночь`
//     : cardNotificationClone.querySelector(
//       '.popup__text--price').remove();
//   item.offer.type !== undefined
//     ? cardNotificationClone.querySelector('.popup__type').textContent = typeOfApartmentObj[item.offer.type]
//     : cardNotificationClone.querySelector('.popup__type').remove();


//   item.offer.rooms === undefined || item.offer.guests === undefined
//     ? cardNotificationClone.querySelector(
//       '.popup__text--capacity').remove()
//     : cardNotificationClone.querySelector(
//       '.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;

//   item.offer.checkin === undefined || item.offer.checkout === undefined
//     ? cardNotificationClone.querySelector(
//       '.popup__text--time').remove()
//     : cardNotificationClone.querySelector(
//       '.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

//   item.offer.features !== undefined
//     ? fillFeatures(cardNotificationClone.querySelector('.popup__features'), item.offer.features)
//     : cardNotificationClone.querySelector('.popup__features').remove();

//   item.offer.photos !== undefined
//     ? fillImages(cardNotificationClone.querySelector('.popup__photos'), item.offer.photos)
//     : cardNotificationClone.querySelector('.popup__photos').remove();

//   item.offer.description !== undefined
//     ? cardNotificationClone.querySelector('.popup__description').textContent = item.offer.description
//     : cardNotificationClone.querySelector('.popup__description').remove();

//   item.author.avatar !== undefined
//     ? cardNotificationClone.querySelector('.popup__avatar').src = item.author.avatar
//     : cardNotificationClone.querySelector('.popup__avatar').remove();


//   // cardNotificationСanvas.appendChild(cardNotificationClone);
//   // console.log(cardNotificationClone);
// });

export { cardNotification };
export { similarCards };
export { fillFeatures, fillImages };


