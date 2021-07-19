import {isEscEvent} from './util.js';

const ALERT_SHOW_TIME = 5000;

/**
 * Действие по нажатию клавиши Esc при удачной отправке данных на сервер
 * Вызывает функцию закрытия сообщения - closeSuccessMessage
 */
const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

/**
 * Действие по нажатию клавиши Esc при НЕудачной отправке данных на сервер
 * Вызывает функцию закрытия сообщения - closeErrorMessage
 */
const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

/**
 * Действие по клику на странице при удачной отправке данных на сервер
 * Вызывает функцию закрытия сообщения - closeSuccessMessage
 */
const onSuccessClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

/**
 * Действие по клику на странице при НЕудачной отправке данных на сервер
 * Вызывает функцию закрытия сообщения - closeErrorMessage
 */
const onErrorClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

/**
 * Функция закрытия сообщения об успешной отправке
 * Удаляет сообщение из DOM
 * Удаляет обработчики с документа (ESC и клик)
 */
function closeSuccessMessage () {
  document.querySelector('.success').remove();

  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessClick);
}

/**
 * Функция закрытия сообщения об НЕуспешной отправке
 * Удаляет сообщение из DOM
 * Удаляет обработчики с документа (ESC и клик)
 */
function closeErrorMessage () {
  document.querySelector('.error').remove();

  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onErrorClick);
}

/**
 * Выводит всплывающее сообщение об ОШИБКЕ при загрузке данных
 * @param {String} message - сообщение об ошибке
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/**
 * Функция отображения сообщения об удачной отправке данных на сервер
 * Находит шаблоне #success - оздает клон шаблона сообщения и вставляет его в body
 * Вешает обработчики событий на документ
 * Документ слушает нажатие на Esc и клик, вызывая функции onSuccessEscKeydown и onSuccessClick, соответственно
 */
const showSuccess = () => {
  const successTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  const successClone = successTemplate.cloneNode(true);

  document.body.appendChild(successClone);

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessClick);
};

/**
 * Функция, показывающая сообщение о НЕуспешной отправке формы
 * Находит шаблон #error - копируя вставляет его в body.
 * Вешает обработчики событий на кнопку error__button, и на документ.
 * Документ слушает клик и нажатие на Esc
 */
const showError = () => {
  const errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');
  const errorClone = errorTemplate.cloneNode(true);

  document.body.appendChild(errorClone);

  errorClone.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorClick);
};

export { showAlert, showSuccess, showError };

