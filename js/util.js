/**
 * Функция проверки, что нажата клавиша Esc
 * @param {Event} evt - событие
 * @returns true если нажатая клавиша Esc и false в остальных случаях
 */
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { isEscEvent };
