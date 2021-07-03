import { form, mapFilters, removeDisabledForms } from './activity-mode-switch.js';
// import { noticeInputAddress } from './form.js';

// import { createNearestPlaces } from './data.js';
import { typeOfApartmentObj } from './data.js';
import { similarCards } from './gen-template.js';
import { cardNotification } from './gen-template.js';
import { fillFeatures, fillImages} from './gen-template.js';


const address = document.querySelector('#address');

const LAT_CENTRE = 35.6895;
const LNG_CENTRE = 139.692;

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;
    removeDisabledForms(form, 'ad-form');
    removeDisabledForms(mapFilters, 'map__filters');
  })
  .setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    title: 'Моя МЕТКА',
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },

);
mainPinMarker.addTo(map).bindPopup(mainPinMarker.title); //! Уточнить у Павла, почему не передаётся значение и затем удалить балун для этой метки


mainPinMarker.on('moveend', (evt) => {
  const markerPosition = (evt.target.getLatLng());
  // console.log(markerPosition);
  address.value = `${markerPosition.lat.toFixed(5)}, ${markerPosition.lng.toFixed(5)}`;

  return markerPosition;
});

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  });

  address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;

  map.setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, 12);
}; //! КАК ЗАКРЫВАТЬ ОТКРЫТЫЕ СООБЩЕНИЯ, ПРИ НАЖАТИИ КНОПКИ РЕЗЕТ, СПРОСИТЬ У ПАВЛА?

export { map, mainPinMarker, resetMap }; //! убрать потом вниз файла СНАЧАЛА СПРОСИТЬ У ПАВЛЯ ЗАЧЕМ МЫ ЭТО ЭКСПОРТИРОВАЛИ

//!---------- попробую получить данные для группы меток и создать эти метки
// const simulatedData = createNearestPlaces(); //? ВООБЩЕ РАЗОБРАТЬСЯ ЧТО УБРАТЬ, ЧТО ОСТАВИТЬ ПРОКОНСУЛЬТИРОВАТЬСЯ С ПАВЛОМ
// console.log(simulatedData);
// console.log(similarCards);
// console.log(cardNotification);

//! НИЖЕ ИСПОЛЬЗУЮ КОД ИЗ ФАЙЛА GEN-TEMPLATE.. УЗНАТЬ У ПАВЛА, КАК ПРАВИЛЬНО, СЮДА ТЯНУТЬ, ИЛИ ОТ СЮДА ПЕРЕДАТЬ?
similarCards.forEach((item) => {
  const newCardClone = cardNotification.cloneNode(true);

  const { lat, lng } = item.location;
  // const offer = point.offer;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  item.offer.title !== undefined
    ? newCardClone.querySelector('.popup__title').textContent =
    item.offer.title
    : newCardClone.querySelector('.popup__title').remove();

  item.offer.address !== undefined
    ? newCardClone.querySelector('.popup__text--address').textContent =
    item.offer.address
    : newCardClone.querySelector('.popup__text--address').remove();

  item.offer.price !== undefined
    ? newCardClone.querySelector(
      '.popup__text--price').textContent = `${item.offer.price} ₽/ночь`
    : newCardClone.querySelector(
      '.popup__text--price').remove();
  item.offer.type !== undefined
    ? newCardClone.querySelector('.popup__type').textContent = typeOfApartmentObj[item.offer.type]
    : newCardClone.querySelector('.popup__type').remove();


  item.offer.rooms === undefined || item.offer.guests === undefined
    ? newCardClone.querySelector(
      '.popup__text--capacity').remove()
    : newCardClone.querySelector(
      '.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;

  item.offer.checkin === undefined || item.offer.checkout === undefined
    ? newCardClone.querySelector(
      '.popup__text--time').remove()
    : newCardClone.querySelector(
      '.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  item.offer.features !== undefined
    ? fillFeatures(newCardClone.querySelector('.popup__features'), item.offer.features)
    : newCardClone.querySelector('.popup__features').remove();

  item.offer.photos !== undefined
    ? fillImages(newCardClone.querySelector('.popup__photos'), item.offer.photos)
    : newCardClone.querySelector('.popup__photos').remove();

  item.offer.description !== undefined
    ? newCardClone.querySelector('.popup__description').textContent = item.offer.description
    : newCardClone.querySelector('.popup__description').remove();

  item.author.avatar !== undefined
    ? newCardClone.querySelector('.popup__avatar').src = item.author.avatar
    : newCardClone.querySelector('.popup__avatar').remove();

  marker
    .addTo(map)
    .bindPopup(newCardClone);
});

