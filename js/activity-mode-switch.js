const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

/**
 * Функция установки disabled на поля переданного элемента
 * @param {Element} element - элемент, на поля которого надо установить disabled
 * @param {String} className - класс, который необходимо добавить
 */
const setDisabledForms = (element, className) => {
  element.classList.add(`${className}--disabled`);

  element.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = true;
  });
};

/**
 * Функция снятия disabled с полей переданного элемента
 * @param {Element} element - элемент, с полей которого надо убрать disabled
 * @param {String} className - класс, который необходимо удалить
 */
const removeDisabledForms = (element, className) => {
  element.classList.remove(`${className}--disabled`);

  element.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = false;
  });
};

/**
 * Вызываем эти функции при инициализации JS
 */
setDisabledForms(form, 'ad-form');
setDisabledForms(mapFilters, 'map__filters');


export { form, mapFilters, removeDisabledForms };
