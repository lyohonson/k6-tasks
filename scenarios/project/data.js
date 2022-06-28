import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const users = new SharedArray('Users', (() => papaparse.parse(open('./csv/usersLoad.csv'), { header: true }).data));

export const signUpBody = () => ({
  login: `${uuidv4()}@test.exness.io`,
  country: 'TH',
  password: 'Qwerty123',
  ip_address: '12.12.12.12',
  wl_id: '8711b8aa-cc68-413a-8034-c2716a2ce14a',
  cookies: {},
  platform: 'web',
  additional_regdata: null,
  language: 'en',
});
