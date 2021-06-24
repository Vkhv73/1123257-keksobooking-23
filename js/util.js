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

export { getRandomInteger };
export { getRandomFloat };
