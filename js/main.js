import './gen-template.js';
import './form.js';
import './activity-mode-switch.js';
import './map-handler.js';
import { setEventListenerFilter } from './filter.js';
import { createPointsMap, updatePoints } from './map-handler.js';
import { getData } from './fetch-api.js';
import { showAlert } from './message.js';
import { debounce } from './utils/debounce.js';

const POINTS_COUNT = 10;
const RERENDER_DELAY = 500;

/**
 * Загружаем данные с сервера
 * @param {Function} createPointsMap - функция в случае успешной загрузки данных, создающая метки на карте
 * @param {Function} showAlert - функция в случае неуспешной загрузки данных, показывает сообщение с ошибкой
 */
getData(((points) => {
  createPointsMap(points.slice(0, POINTS_COUNT));
  setEventListenerFilter(debounce(() => updatePoints(points), RERENDER_DELAY));
}),
showAlert);
