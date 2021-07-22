import { resetMap } from './map-handler.js';
import { sendData } from './fetch-api.js';
import { resetFilter } from './filter.js';
import { showSuccess, showError } from './message.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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
const sendNoticeForm = noticeForm.querySelector('.ad-form');
const time = document.querySelector('.ad-form__element--time');
const timeIn = time.querySelector('#timein');
const timeOut = time.querySelector('#timeout');

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

/**
 * Начальные значения элементов формы - сразу после загрузки страницы, до ввода пользователем
 */
const defaultFormSetting = {
  avatarKey: noticeFormAvatar.src,
  // Значение title = пустая строка (как изначально)
  titleKey: noticeFormTitleInput.value,
  // Значение типа жилья = пустая строка (как изначально)
  typeKey: noticeFormTypeInput.value,
  // Значение цены = пустая строка (как изначально)
  priceKey: noticeFormPriceInput.value,
  // Значение цены по умолчанию в плейсхолдере = значение плейсхолдера (как изначально)
  pricePlaceholder: noticeFormPriceInput.placeholder,
  // Значение времени заезда = значение value (как изначально)
  timeInKey: timeIn.value,
  // Значение времени выезда = значение value (как изначально)
  timeOutKey: timeOut.value,
  // Значение количества комнат = значение value (как изначально)
  roomNumberKey: noticeFormRoomNumber.value,
  // Значение количества жильцов = значение value (как изначально)
  capacityKey: noticeFormCapacity.value,
  // Значение поля ОПИСАНИЕ = значение value (как изначально)
  descriptionKey: noticeFormDescription.value,
};

/**
 * Валидация поля "ЗАГОЛОВОК" текстовое, от 30 до 100 символов
 */
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

/**
 * Валидация полей "ТИП ЖИЛЬЯ И ЦЕНА ЗА НОЧЬ"
 */
noticeFormTypeInput.addEventListener('change', (evt) => {
  const selectValue = evt.target.value;

  noticeFormPriceInput.placeholder = minPriceType[selectValue];
  noticeFormPriceInput.min = minPriceType[selectValue];
});

/**
 * Валидация полей "КОЛИЧЕСТВО КОМНАТ И КОЛИЧЕСТВО ГОСТЕЙ"
 */
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

/**
 * Обработчик события change на элементе количество комнат
 */
noticeFormRoomNumber.addEventListener('change', () => {
  validateRoomsAndGuestsNumber();
});

/**
 * Обработчик события change на элементе количество гостей
 */
noticeFormCapacity.addEventListener('change', () => {
  validateRoomsAndGuestsNumber();
});

/**
 * Обработчик события change на элементе времени заезда
 * Проиходит синхронизация полей
 */
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

/**
 * Обработчик события change на элементе времени выезда
 * Проиходит синхронизация полей
 */
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

/**
 * Функция сброса введённых данных до дефолтных при нажатии кнопки ОЧИСТИТЬ или при удачной отправке формы
 */
const resetForm = () => {
  // Сбрасываем путь у картинки на дефолтный
  noticeFormAvatar.src = defaultFormSetting.avatarKey;
  // Сбрасываем значение у заголовка на дефолтный (пустая строка)
  noticeFormTitleInput.value = defaultFormSetting.titleKey;
  // Сбрасываем значение у типа жилья на дефолтный (Квартира)
  noticeFormTypeInput.value = defaultFormSetting.typeKey;
  // Сбрасываем значение у цены на дефолтный (пустая строка)
  noticeFormPriceInput.value = defaultFormSetting.priceKey;
  // Сбрасываем плейсхолдер у цены на дефолтный (5000)
  noticeFormPriceInput.placeholder = defaultFormSetting.pricePlaceholder;
  // Сбрасываем время заезда на дефолтное (12:00)
  timeIn.value = defaultFormSetting.timeInKey;
  // Сбрасываем время выезда на дефолтное (12:00)
  timeOut.value = defaultFormSetting.timeOutKey;
  // Сбрасываем количество комнат на дефолтное (1)
  noticeFormRoomNumber.value = defaultFormSetting.roomNumberKey;
  // Сбрасываем количество жильцов (вместимость) на дефолтное (1 гость)
  noticeFormCapacity.value = defaultFormSetting.capacityKey;
  // Сбрасываем описание на дефолтное (пустая строка)
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
 * Вызывает показ сообщения об успешной отправке и сбрасывает форму
 */
const sendSuccess = () => {
  showSuccess();
  resetForm();
};

/**
 * Обработчик клика на кнопке сброса формы
 * Вызывает функцию сброса формы - resetForm
 * Вызывает функцию сброса фильтров - resetFilter
 * Вызывает функцию сброса карты - resetMap
 */
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetFilter();
  resetMap();
});

/**
 * Обработчик отправки формы
 */
sendNoticeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  /**
   * Функция отправки данных
   * @param sendSuccess - функция, вызываемая в случае успешной отправки на сервер
   * @param showError - функция, вызываемая в случае ошибки при отправке на сервер
   * @param formData - данные, введенный пользователем, которые отправятся на сервер.
   * Получены при помощи конструктора FormData на строке 217
   */
  sendData(sendSuccess, showError, formData);
});
