import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const END_POINT = '/name/';
  const FIELDS = 'fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}${END_POINT}${name}?${FIELDS}`)
    .then(response => response.json())
    .then(arrayCountries => {
      if (arrayCountries.status) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error(arrayCountries.status);
      }

      return arrayCountries;
    });
}
