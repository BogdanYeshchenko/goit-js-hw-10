import './css/styles.css';

import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const el = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

el.input.addEventListener('input', debounce(handleCountries, DEBOUNCE_DELAY));

function handleCountries(e) {
  e.preventDefault();
  const name = e.target.value;
  let countriesListHtml = '';
  let countriInfoHtml = '';

  if (!name) {
    el.countryList.innerHTML = countriesListHtml;
    el.countryInfo.innerHTML = countriInfoHtml;
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        countriInfoHtml = createCountriInfo(countries);
      } else {
        countriesListHtml = createCountriesList(countries);
      }

      el.countryList.innerHTML = countriesListHtml;
      el.countryInfo.innerHTML = countriInfoHtml;
    })
    .catch(err => {
      el.countryList.innerHTML = countriesListHtml;
      el.countryInfo.innerHTML = countriInfoHtml;
    });
}

function createCountriInfo(countri) {
  const { flags, name, capital, population, languages } = countri[0];

  let CountriInfo = `
      <img src="${flags.svg}" alt="flags${name.common}" width="40"/><b>${
    name.common
  }</b>
      <p><b>Capital:</b>${capital}</p>
      <p><b>Population:</b>${population}</p>
      <p><b>Languages:</b>${Object.keys(languages).join(', ')}</p>
        `;
  return CountriInfo;
}

function createCountriesList(countries) {
  return countries
    .map(
      ({ flags, name }) =>
        `<li class="countri-item"><img src="${flags.svg}" alt="flags${name.common}" class="countri-flag" width="40"/><b  class="countri-name">${name.common}</b></li>`
    )
    .join('');
}
