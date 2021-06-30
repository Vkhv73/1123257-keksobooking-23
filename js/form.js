const noticeForm = document.querySelector('.notice');

const noticeFormTitleInput = noticeForm.querySelector('#title');
const noticeFormPriceInput = noticeForm.querySelector('#price');
const noticeFormTypeInput = noticeForm.querySelector('#type');
const noticeFormRoomNumber = noticeForm.querySelector('#room_number');
const noticeFormCapacity = noticeForm.querySelector('#capacity');

const time = document.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');

const MIN_TITLE_LENGTH = noticeFormTitleInput.minLength;
const MAX_TITLE_LENGTH = noticeFormTitleInput.maxLength;

const minPriceType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomsNumber = {
  'one room': 1,
  'two rooms': 2,
  'three rooms': 3,
  'one hundred rooms': 100,
};

const capacityNumber = {
  'one guest': 1,
  'two guests': 2,
  'three guests': 3,
  'no guest': 0,
};


// валидация поля "ЗАГОЛОВОК" текстовое, от 30 до 100 символов
noticeFormTitleInput.addEventListener('input', () => {
  const valueLength = noticeFormTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    noticeFormTitleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    noticeFormTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    noticeFormTitleInput.setCustomValidity('');
  }
  noticeFormTitleInput.reportValidity();
});

// валидация полей "ТИП ЖИЛЬЯ И ЦЕНА ЗА НОЧЬ"
noticeFormTypeInput.addEventListener('change', (evt) => {
  const selectValue = evt.target.value;

  noticeFormPriceInput.placeholder = minPriceType[selectValue];
  noticeFormPriceInput.min = minPriceType[selectValue];
});
// валидация полей "КОЛИЧЕСТВО КОМНАТ И КОЛИЧЕСТВО ГОСТЕЙ"
const validateRoomsAndGuestsNumber = () => {
  const roomValue = Number(noticeFormRoomNumber.value);
  const capacityValue = Number(noticeFormCapacity.value);

  if (roomValue === roomsNumber['one hundred rooms'] && capacityValue !== capacityNumber['no guest']) {
    // Сработает, когда выбрано 100 комнат и выбрано НЕ "не для гостей", например 100 комнат и 3 гостя
    noticeFormCapacity.setCustomValidity('Данный вариант не для гостей');

  } else if (roomValue !== roomsNumber['one hundred rooms'] && capacityValue === capacityNumber['no guest']) {
    // Сработает, когда выбрано "не для гостей" и НЕ выбрано 100 комнат, например не для гостей и 3 комнаты
    noticeFormCapacity.setCustomValidity('Данный вариант предполагает наличие гостей');

  } else if (roomValue < capacityValue) {
    // Сработает, когда например выбрано 1 комната и 2 и больше гостей
    noticeFormCapacity.setCustomValidity('Слишком много гостей или слишком мало комнат');

  } else {
    // Форма валидна, например 100 комнат и не для гостей, 1 комната для 1 гостя
    noticeFormCapacity.setCustomValidity('');

  }
};

noticeFormRoomNumber.addEventListener('change', () => {
  validateRoomsAndGuestsNumber();
});

noticeFormCapacity.addEventListener('change', () => {
  validateRoomsAndGuestsNumber();
});

//!========== ниже валидация и синхронизация для времени заезда задание 8-2

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});
