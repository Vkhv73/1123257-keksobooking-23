//!========== ниже перевод в АКТИВНОЕ-НЕАКТИВНОЕ СОСТОЯНИЕ  задание 7-2
// import './map-handler.js';
// import { map } from './map-handler.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const setDisabledForms = (element, className) => {
  element.classList.add(`${className}--disabled`);

  element.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = true;
  });
};

const removeDisabledForms = (element, className) => {
  element.classList.remove(`${className}--disabled`);

  element.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = false;
  });
};

setDisabledForms(form, 'ad-form');
setDisabledForms(mapFilters, 'map__filters');


export { form, mapFilters, removeDisabledForms };
