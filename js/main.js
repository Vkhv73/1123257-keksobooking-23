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

const getRandomFloat = function (minValue, maxValue, decimalPlaces) {
  if (minValue < maxValue && minValue >= 0) {
    return parseFloat(
      (minValue + Math.random() * (maxValue - minValue)).toFixed(decimalPlaces));
  }

  throw new Error(
    'Значение "от" меньше нуля или больше значения "до", или введены нечисловые значения');
};

getRandomFloat(1.02, 10.1, 7);
