/**
 * Функция получения данных с сервера
 * @param {Function} onSuccess - вызывается в случае успешной загрузки
 * @param {Function} onError - вызывается в случае НЕуспешной загрузки
 */
const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((dataList) => {
      onSuccess(dataList);
    })
    .catch(() => {
      onError('Не удалось загрузить данные!');
    });
};

/**
 * Функция отправки данных на сервер
 * @param {Function} onSuccess - вызывается в случае успешной отправки
 * @param {Function} onError - вызывается в случае НЕуспешной отправки
 * @param {FormData} body - данные для отправки, введенные пользователем в формате FormData
 */
const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      (response.ok) ? onSuccess() : onError();
    })
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
