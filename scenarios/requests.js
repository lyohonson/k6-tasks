import { group } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';
import check200 from './assertions.js';

const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
const BASE_URL = 'http://www.load-test.ru:1080';

export function openMainPage() {
  const homePage = http.get(`${BASE_URL}/webtours`);
  check200(homePage);
}

export function getNavHome() {
  const getNavParams = { page: 'menu', in: 'home' };
  const getNav = http.get(`${BASE_URL}/cgi-bin/nav.pl`, getNavParams);
  check200(getNav);
}

export function getLogin() {
  const getLoginParams = { intro: true };
  const getLogin = http.get(`${BASE_URL}/cgi-bin/login.pl`, getLoginParams);
  check200(getLogin);
}

export function openHomePage() {
  group('Open Home Page', () => {
    openMainPage();
    getNavHome();
    getLogin();
  });
}

export function login() {
  group('Login', () => {
    const body = 'username=ashugaev1&password=Qwerty123&JSFormSubmit=off&userSession=133937.37';
    const postLogin = http.post(`${BASE_URL}/cgi-bin/login.pl`, body);
    check200(postLogin);

    getNavHome();
    getLogin();
  });
}

export function openFlights() {
  group('openGlights', () => {
    const getWelcomeParams = { page: 'search' };
    const getNav = http.get(`${BASE_URL}/cgi-bin/welcome.pl`, getWelcomeParams);
    check200(getNav);

    const getNavFlightsParams = { page: 'search' };
    const getNavFlights = http.get(`${BASE_URL}/cgi-bin/nav.pl`, getNavFlightsParams);
    check200(getNavFlights);

    const getReservationsParams = { page: 'menu', in: 'flights' };
    const getReservations = http.get(`${BASE_URL}/cgi-bin/reservations.pl`, getReservationsParams);
    check200(getReservations);
  });
}

export function setFlightPrefs(departCity, arriveCity, seatPref, seatType) {
  group('setFlightPrefs', () => {
    const reserveDirectionBody = `advanceDiscount=0&depart=${departCity.name}&departDate=${new Date() + 1}&arrive=${arriveCity.name}&returnDate=${new Date() + 8}&numPassengers=1&seatPref=${seatPref}&seatType=${seatType}`;
    const postReservationDirection = http.post(`${BASE_URL}/cgi-bin/reservations.pl`, reserveDirectionBody, headers);
    check200(postReservationDirection);

    const reserveSeatBody = `numPassengers=1&advanceDiscount=0&seatType=${seatType}&seatPref=${seatPref}`;
    const postReservationsSeat = http.post(
      `${BASE_URL}/cgi-bin/reservations.pl`,
      reserveSeatBody,
      headers,
    );
    check200(postReservationsSeat);

    const reservationPaymentBody = {
      firstName: 'Aleksei',
      lastName: 'Ivanov',
      address1: 'address1',
      address2: 'address2',
      pass1: 'Window',
      creditCard: 57,
      expDate: 0,
      numPassengers: 1,
      seatType,
      seatPref,
      outboundFlight: `${departCity.number}${arriveCity.number}${Math.round(randomIntBetween(0, 2))};529;${new Date() + 1}`,
      advanceDiscount: 0,
      JSFormSubmit: 'off',
    };
    const postReservationsPaymentDetails = http.post(
      `${BASE_URL}/cgi-bin/reservations.pl`,
      reservationPaymentBody,
      headers,
    );
    check200(postReservationsPaymentDetails);
  });
}
