import {isEscEvent} from './util.js';

const ALERT_SHOW_TIME = 5000;

const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onSuccessClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const onErrorClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

function closeSuccessMessage () {
  document.querySelector('.success').remove();

  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessClick);
}

function closeErrorMessage () {
  document.querySelector('.error').remove();

  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onErrorClick);
}

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

const showSuccess = () => {
  const successTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  const successClone = successTemplate.cloneNode(true);

  document.body.appendChild(successClone);

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessClick);
};

/**
 * Функция, показывающая сообщение о неуспешной отправки формы
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

