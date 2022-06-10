import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const arriveCities = new SharedArray('Arrive cities', (() => papaparse.parse(open('./data/arriveCities.csv'), { header: true }).data));
export const departCities = new SharedArray('Depart cities', (() => papaparse.parse(open('./data/departCities.csv'), { header: true }).data));

export const seatTypes = ['First', 'Business', 'Coach'];
export const seatPrefs = ['Aisle', 'Window', 'None'];
