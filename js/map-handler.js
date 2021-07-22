import { form, mapFilters, removeDisabledForms } from './activity-mode-switch.js';
import { getFilteredPoint, setEventListenerFilter } from './filter.js';
import { getData } from './fetch-api.js';
import { showAlert } from './message.js';
import { debounce } from './utils/debounce.js';
import { createPopup } from './gen-template.js';

const LAT_CENTRE = 35.6895;
const LNG_CENTRE = 139.692;
const MAP_SCALE = 12;
const POINTS_COUNT = 10;
const RERENDER_DELAY = 500;
const PIN_ICON_SIZE = {
  width: 40,
  height: 40,
};
const MAIN_PIN_ICON_SIZE = {
  width: 52,
  height: 52,
};

const address = document.querySelector('#address');

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

let dataPoints = [];

/**
 * Инициализация карты
 */
const map = L.map('map-canvas')
  /**
   * Обработчик загрузки карты
   * После успешной загрузки карты проставляет lat и lng в поле адреса
   * И снимает disabled с полей формы
   */
  .on('load', () => {
    address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;
    removeDisabledForms(form, 'ad-form');
  })
  /**
   * Установка вида карты с переданными координатами и масштабом
   */
  .setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, MAP_SCALE);

/**
 * Создание слоя копирайта и добавление его на карту
 */
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/**
 * Добавление главного пина и его вставка
 */
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

/**
 * Обработчик перемещение главной метки с помощью мышки
 * Получает новые координаты и подставляет их в поле адрес
 */
mainPinMarker.on('moveend', (evt) => {
  const markerPosition = (evt.target.getLatLng());

  address.value = `${markerPosition.lat.toFixed(5)}, ${markerPosition.lng.toFixed(5)}`;

  return markerPosition;
});

/**
 * Создание слоя для похожих загруженных с сервера объектов и добавление его на карту
 */
const markerGroup = L.layerGroup().addTo(map);

/**
 * Функция, создания меток на карту
 * @param {Array} arrayCards - массив загруженных данных (объектов объявлений)
 */
const createPointsMap = (arrayCards) => {
  /**
   * Снимаем блокировку фильтров, при успешной загрузки данных
   */
  removeDisabledForms(mapFilters, 'map__filters');

  /**
   * Проход по массиву загруженных объявлегний и создание маркеров и привязки попапов
   * @param {Object} item - одно объявление из массива
   */
  arrayCards.forEach((item) => {
    const { lat, lng } = item.location;

    /**
     * Создание одного маркера по координатам и иконке
     */
    const marker = L.marker(
      {
        lat: lat,
        lng: lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      /**
       * Добавление маркера на карту
       */
      .addTo(markerGroup)
      /**
       * Привязка к маркеру результата createPopup
       */
      .bindPopup(
        /**
         * Функция заполнения шаблона из HTML данными с сервера
         * @param {Object} item - одно объявление из массива
         * Результатом функции является HTML-элемент <article> (попап)
         */
        createPopup(item),
        {
          keepInView: true,
        });
  });
};

const resetMarkersLayer = () => {
  markerGroup.clearLayers();
};

const updatePoints = (points) => {
  resetMarkersLayer();
  const filteredPoints = getFilteredPoint(points);
  createPointsMap(filteredPoints);
};


/**
 * Функция сброса карты
 * Очищает слой маркеров
 * Добавляет новые маркеры
 * Ставит карту в исходное состояние
 */
const resetMap = () => {
  updatePoints(dataPoints);

  mainPinMarker.setLatLng({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }).update();

  address.value = `${LAT_CENTRE}, ${LNG_CENTRE}`;

  map.setView({
    lat: LAT_CENTRE,
    lng: LNG_CENTRE,
  }, MAP_SCALE);
};

/**
 * Загружаем данные с сервера, когда карта готова
 */
map.whenReady(() => {
  /**
   * Загружаем данные с сервера
   * @param {Function} Anonymous - функция в случае успешной загрузки данных, создающая метки на карте,
   * навешивает обработчики на фильтры
   * @param {Function} showAlert - функция в случае неуспешной загрузки данных, показывает сообщение с ошибкой
   */
  getData(((pointsFromServer) => {
    dataPoints = pointsFromServer;
    createPointsMap(dataPoints.slice(0, POINTS_COUNT));
    setEventListenerFilter(debounce(() => updatePoints(dataPoints), RERENDER_DELAY));
  }),
  showAlert);
});


export { resetMap, createPointsMap, updatePoints };
