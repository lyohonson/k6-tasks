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
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      timeUnit: '1m',

      preAllocatedVUs: 100,

      stages: [
        { target: 30, duration: '1m' },
        { target: 30, duration: '1m' },
        { target: 60, duration: '1m' },
        { target: 60, duration: '1m' },
        { target: 90, duration: '1m' },
        { target: 90, duration: '1m' },
        { target: 120, duration: '1m' },
        { target: 120, duration: '1m' },
        { target: 150, duration: '1m' },
        { target: 150, duration: '1m' },
        { target: 180, duration: '1m' },
        { target: 180, duration: '1m' },
        { target: 210, duration: '1m' },
        { target: 210, duration: '1m' },
        { target: 240, duration: '1m' },
        { target: 240, duration: '1m' },
        { target: 270, duration: '1m' },
        { target: 270, duration: '1m' },
        { target: 300, duration: '1m' },
        { target: 300, duration: '1m' },
      ],
    },
  },
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
