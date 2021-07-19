import { form, mapFilters, removeDisabledForms } from './activity-mode-switch.js';

// import { createRandomNearestPlaces } from './data.js';
import { createPopup } from './gen-template.js';

const address = document.querySelector('#address');
// Создание массива из 10ти рандомных обхектов
// Потом будем получать данные с сервера
// const similarCards = createRandomNearestPlaces();

const LAT_CENTRE = 35.6895;
const LNG_CENTRE = 139.692;

const MAP_SCALE = 12;

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;
    removeDisabledForms(form, 'ad-form');
  })
  .setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const PIN_ICON_SIZE = {
  width: 40,
  height: 40,
};
const MAIN_PIN_ICON_SIZE = {
  width: 52,
  height: 52,
};

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [PIN_ICON_SIZE.width, PIN_ICON_SIZE.height],
  iconAnchor: [PIN_ICON_SIZE.width/2, PIN_ICON_SIZE.height],
});

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE.width, MAIN_PIN_ICON_SIZE.height],
  iconAnchor: [MAIN_PIN_ICON_SIZE.width/2, MAIN_PIN_ICON_SIZE.height],
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
mainPinMarker.addTo(map);
// mainPinMarker.bindPopup(mainPinMarker.title); //! +++ Уточнить у Павла, почему не передаётся значение и затем удалить балун для этой метки

mainPinMarker.on('moveend', (evt) => {
  const markerPosition = (evt.target.getLatLng());
  // console.log(markerPosition);
  address.value = `${markerPosition.lat.toFixed(5)}, ${markerPosition.lng.toFixed(5)}`;

  return markerPosition;
});

const markerGroup = L.layerGroup().addTo(map);

const createPointsMap = function (arraySimilarCards) {
  removeDisabledForms(mapFilters, 'map__filters'); // снимаем блокировку фильтра, при успехе загрузки данных

  arraySimilarCards.forEach((item) => {
    const { lat, lng } = item.location;

    const marker = L.marker(
      {
        lat: lat, // item.location.lat
        lng: lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(item), // Результат createPopup => htmlelement article
        {
          keepInView: true,
        });
  });
};

const resetMap = () => {
  markerGroup.clearLayers(); // очистит и не добавит

  // createPointsMap(similarCards); // а эта добавит //! ВОТ ТАК БЫЛО

  fetch('https://23.javascript.pages.academy/keksobooking/data') //! КАК ЭТО РЕШИТЬ? - У ПАВЛА
    .then((response) => response.json())
    .then((dataList) => {
      createPointsMap(dataList);
    });

  mainPinMarker.setLatLng({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  });

  address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;

  map.setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, MAP_SCALE);
};


export { map, mainPinMarker, resetMap, createPointsMap, markerGroup };
