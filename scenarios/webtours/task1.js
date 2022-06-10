import { scenario } from 'k6/execution';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';
import {
  login,
  openFlights,
  openHomePage,
  openMainPage,
  setFlightPrefs,
} from './requests.js';
import {
  arriveCities,
  departCities,
  seatPrefs,
  seatTypes,
} from './data.js';

export const options = {
  vus: 1,
  duration: '1s',
};

export default function () {
  const arriveCity = arriveCities[scenario.iterationInTest % arriveCities.length];
  const departCity = departCities[scenario.iterationInTest % departCities.length];
  const seatType = randomItem(seatTypes);
  const seatPref = randomItem(seatPrefs);

  openMainPage();
  login();
  openFlights();
  setFlightPrefs(departCity, arriveCity, seatPref, seatType);
  openHomePage();
}
