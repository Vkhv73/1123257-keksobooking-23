import { createPointsMap } from './map-handler.js';

const getData = (onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((dataList) => {
      createPointsMap(dataList);
    })
    .catch(() => {
      onError('Не удалось загрузить данные');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.page.academy/keksobooking',
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
