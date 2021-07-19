import './gen-template.js';
import './form.js';
import './activity-mode-switch.js';
import './map-handler.js';
import { createPointsMap } from './map-handler.js';
import { getData } from './fetch-api.js';
import { showAlert } from './message.js';

/**
 * Загружаем данные с сервера
 * @param {Function} createPointsMap - функция в случае успешной загрузки данных, создающая метки на карте
 * @param {Function} showAlert - функция в случае неуспешной загрузки данных, показывает сообщение с ошибкой
 */
getData(createPointsMap, showAlert);
