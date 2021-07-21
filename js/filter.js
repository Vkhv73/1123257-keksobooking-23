const DEFAULT_FILTER = 'any';
const POINTS_COUNT = 10;

const priceRange = {
  low: 10000,
  middle: 50000,
};

const filterContainer = document.querySelector('.map__filters');
const filterSelects = filterContainer.querySelectorAll('.map__filter');
const filterHousingType = filterContainer.querySelector('#housing-type');
const filterHousingPrice = filterContainer.querySelector('#housing-price');
const filterHousingRooms = filterContainer.querySelector('#housing-rooms');
const filterHousingGuests = filterContainer.querySelector('#housing-guests');
const filterHousingFeatures = filterContainer.querySelectorAll('#housing-features input');

const getFilteredPoint = (points) => {
  let filteredPoints = points.slice();

  if (filterHousingType.value !== DEFAULT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.type === filterHousingType.value);
  }

  if (filterHousingPrice.value !== DEFAULT_FILTER) {
    switch (filterHousingPrice.value) {
      case 'low':
        filteredPoints = filteredPoints.filter((point) => point.offer.price < priceRange.low);
        break;

      case 'middle':
        filteredPoints = filteredPoints.filter((point) => point.offer.price >= priceRange.low && point.offer.price <= priceRange.middle);
        break;

      case 'high':
        filteredPoints = filteredPoints.filter((point) => point.offer.price > priceRange.middle);
        break;
    }
  }

  if (filterHousingRooms.value !== DEFAULT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.rooms.toString() === filterHousingRooms.value);
  }

  if (filterHousingGuests.value !== DEFAULT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.guests.toString() === filterHousingGuests.value);
  }

  const checkedFeatures = filterContainer.querySelectorAll('input:checked');

  if (checkedFeatures !== undefined) {
    checkedFeatures.forEach((input) => {
      filteredPoints = filteredPoints.filter((point) => {
        if (point.offer.features !== undefined) {
          return point.offer.features.indexOf(input.value) !== -1;
        }
      });
    });
  }

  return filteredPoints.slice(0, POINTS_COUNT);
};

const setEventListenerFilter = (callBack) => {
  filterSelects.forEach((element) => {
    element.addEventListener('change', () => callBack());
  });

  filterHousingFeatures.forEach((element) => {
    element.addEventListener('change', () => callBack());
  });
};

const resetFilter = () => {
  filterSelects.forEach((element) => {
    element.value = DEFAULT_FILTER;
  });

  const checkedFeatures = filterContainer.querySelectorAll('input:checked');

  checkedFeatures.forEach((element) => {
    element.checked = false;
  });
};

export { getFilteredPoint, setEventListenerFilter, resetFilter };
