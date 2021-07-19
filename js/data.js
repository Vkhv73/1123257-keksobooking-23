// import {getRandomInteger} from './util.js';
// import {getRandomFloat} from './util.js';

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
const typeOfApartmentObj = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
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
      NUMBER_OF_AVATARS_MAX)}.png`,
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

// Рандомный объект
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
      photos: arrayOfPhotos.slice(
        getRandomInteger(0, arrayOfPhotos.length - 1)),
    },
    location: geoLocation, // тут мы просто подставляем объект
  };
};

// Функция по созданию массива из 10ти рандомных обхектов
const createRandomNearestPlaces = () => {
  const textus = new Array(OBJECTS_COUNT) // создаем массив из 10 чисел
    .fill(null) // заполняем пустотой
    .map(() => createNearestPlace()); // заполняем каждый из 10 элементов созданием объекта
  return textus;
};

export { createRandomNearestPlaces, typeOfApartmentObj };
// export { typeOfApartmentObj };
