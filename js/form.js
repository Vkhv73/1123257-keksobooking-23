import { resetMap } from './map-handler.js';
import { sendData } from './fetch-api.js';
import { showSuccess, showError } from './message.js';

const noticeForm = document.querySelector('.notice');
const noticeFormAvatar = noticeForm.querySelector('.ad-form-header__preview img');
const noticeFormTitleInput = noticeForm.querySelector('#title');
const noticeFormPriceInput = noticeForm.querySelector('#price');
const noticeFormTypeInput = noticeForm.querySelector('#type');
const noticeFormRoomNumber = noticeForm.querySelector('#room_number');
const noticeFormCapacity = noticeForm.querySelector('#capacity');
const noticeFormDescription = noticeForm.querySelector('#description');
const noticeFormFeatures = noticeForm.querySelectorAll('.features__checkbox');
const noticeFormPhotos = noticeForm.querySelectorAll('.ad-form__photo');
const resetButton = noticeForm.querySelector('.ad-form__reset');
const sendNoticeForm = noticeForm.querySelector('.ad-form'); // нашёл форму отправки

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

// Начальные значения элементов формы
const defaultFormSetting = {
  avatarKey: noticeFormAvatar.src,
  // Значение title = пустая строка (как изначально)
  titleKey: noticeFormTitleInput.value,
  typeKey: noticeFormTypeInput.value,
  priceKey: noticeFormPriceInput.value,
  pricePlaceholder: noticeFormPriceInput.placeholder,
  timeInKey: timeIn.value,
  timeOutKey: timeOut.value,
  roomNumberKey: noticeFormRoomNumber.value,
  capacityKey: noticeFormCapacity.value,
  descriptionKey: noticeFormDescription.value,
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

const resetForm = () => {
  // Сбрасываем путь у картинки на дефолтный
  noticeFormAvatar.src = defaultFormSetting.avatarKey;
  // Сбрасываем значение у заголовка на дефолтный (пустая строка)
  noticeFormTitleInput.value = defaultFormSetting.titleKey;

  noticeFormTypeInput.value = defaultFormSetting.typeKey;
  // Сбрасываем значение у цены на дефолтный (пустая строка)
  noticeFormPriceInput.value = defaultFormSetting.priceKey;
  // Сбрасываем плейсхолдер у цены на дефолтный (5000)
  noticeFormPriceInput.placeholder = defaultFormSetting.pricePlaceholder;

  timeIn.value = defaultFormSetting.timeInKey;

  timeOut.value = defaultFormSetting.timeOutKey;

  noticeFormRoomNumber.value = defaultFormSetting.roomNumberKey;

  noticeFormCapacity.value = defaultFormSetting.capacityKey;

  noticeFormDescription.value = defaultFormSetting.descriptionKey;

  // Убираем checked у чекбоксов
  noticeFormFeatures.forEach((item) => {
    item.checked = false;
  });

  // Очищаем загруженные фотки объявления
  noticeFormPhotos.innerHTML = '';
};

/**
 * Функция, вызываемая при успешной отправке
 * Вызывает показ сообщения об успешной отправки и сбрасывает форму
 */
const sendSuccess = () => {
  showSuccess();
  resetForm();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  // resetFilter();
  resetMap();
});
//!=== ниже обработка кнопки отправки формы

sendNoticeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  /**
   * Функция отправки данных
   * @param sendSuccess - функция, вызываемая в случае успешной отправки на сервер
   * @param showError - функция, вызываемая в случае ошибки при отправки на сервер
   * @param formData - данные, введенный пользователем, которые отправятся на сервер.
   * Получены при помощи конструктора FormData на строке 177
   */
  sendData(sendSuccess, showError, formData);
});
