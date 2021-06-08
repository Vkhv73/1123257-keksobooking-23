/**
 * Для написания использовал материаилы с сайтов https://learn.javascript.ru/number
 * и https://ru.stackoverflow.com/questions/863591/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B5-%D1%87%D0%B8%D1%81%D0%BB%D0%BE-%D0%BE%D1%82-1-%D0%B4%D0%BE-100
 */
//! Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomInteger = function (minValue, maxValue) {
  if (minValue < maxValue && minValue >= 0) {
    return Math.round(minValue + Math.random() * (maxValue - minValue));
  }
  throw new Error(
    'Значение "от" меньше нуля или больше значения "до", или введены нечисловые значения');

};

getRandomInteger(0, 5);

//! Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = function (minValue, maxValue, decimalPlaces = 1) {
  if (minValue < maxValue && minValue >= 0) {
    return parseFloat(
      (minValue + Math.random() * (maxValue - minValue)).toFixed(decimalPlaces));
  }

  throw new Error(
    'Значение "от" меньше нуля или больше значения "до", или введены нечисловые значения');
};

getRandomFloat(1.02, 10.1, 7);

//! ниже решение для задания к четвёртой теме
const OBJECTS_COUNT = 10;
const NUMBER_OF_AVATARS_MIN = 1;
const NUMBER_OF_AVATARS_MAX = 8;
const PRICE_MIN = 1;
const PRICE_MAX = 1000000;
const NUMBER_OF_ROOMS_MIN = 1;
const NUMBER_OF_ROOMS_MAX = 5;
const NUMBER_OF_GUESTS_MIN = 1;
const NUMBER_OF_GUESTS_MAX = 55;
const LATITUDE = {
  MIN: 35.65,
  MAX: 35.7,
};
const LONGITUDE = {
  MIN: 139.7,
  MAX: 139.8,
};
const ACCURACY_OF_COORDINATES = 5; // количество знаков после запятой в координатах

const typeOfApartment = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const timeOfCheck = ['12:00', '13:00', '14:00'];
const presenceOfFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const arrayOfPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAutor = () => {
  const autor = {
    avatar: `img/avatars/user0${getRandomInteger(
      NUMBER_OF_AVATARS_MIN,
      NUMBER_OF_AVATARS_MAX,
    )}.png`,
  };
  return autor;
};

const createLocation = () => {
  const location = {
    lat: getRandomFloat(LATITUDE.MIN, LATITUDE.MAX, ACCURACY_OF_COORDINATES),
    lng: getRandomFloat(LONGITUDE.MIN, LONGITUDE.MAX, ACCURACY_OF_COORDINATES),
  };
  return location;
};

const createNearestPlace = () => {
  const geoLocation = createLocation();

  return {
    author: createAutor(),
    offer: {
      title: 'Найдите спецпредложения для отелей, домов и других вариантов',
      address: `${geoLocation.lat}, ${geoLocation.lng}`,
      price: getRandomInteger(PRICE_MIN, PRICE_MAX),
      type: typeOfApartment[getRandomInteger(0, typeOfApartment.length - 1)],
      rooms: getRandomInteger(NUMBER_OF_ROOMS_MIN, NUMBER_OF_ROOMS_MAX),
      guests: getRandomInteger(NUMBER_OF_GUESTS_MIN, NUMBER_OF_GUESTS_MAX),
      checkin: timeOfCheck[getRandomInteger(0, timeOfCheck.length - 1)],
      checkout: timeOfCheck[getRandomInteger(0, timeOfCheck.length - 1)],
      features: presenceOfFeatures.slice(
        getRandomInteger(0, presenceOfFeatures.length - 1)),
      description: 'Просто сказка!',
      photos: arrayOfPhotos[getRandomInteger(1, arrayOfPhotos.length - 1)],
    },
    // offer: createOffer(geoLocation), // а тут передаем, чтоб из него взять
    location: geoLocation, // тут мы просто подставляем объект
  };
};

const createNearestPlaces = () => {
  const textus = new Array(OBJECTS_COUNT) // создаем массив из 10 чисел
    .fill(null) // заполняем пустотой
    .map(() => createNearestPlace()); // заполняем каждый из 10 элементов созданием объекта
  return textus;
};
// eslint-disable-next-line no-console
console.log(createNearestPlaces());
