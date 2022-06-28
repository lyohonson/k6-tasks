import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';
import {
  htmlReport
} from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { signUpBody, users } from './data.js';
import { check200, check201 } from '../assertions.js';

const BASE_URL = 'https://iam-api-gateway.test.env';


export function signup() {
  const signupResp = http.post(
    `${BASE_URL}/api/v1/flows/registration`,
    JSON.stringify(signUpBody()),
    { headers: { 'Content-Type': 'application/json' } },
  );
  // console.log(`auth request body ${signupResp.request.body}`);
  //
  // console.log(`signup response body ${signupResp.body}`);
  // console.log(`signup response status ${signupResp.status}`);
  check201(signupResp);
}

export function auth() {
  const body = {
    // wl_id: '8711b8aa-cc68-413a-8034-c2716a2ce14a',
    username: randomItem(users).email,
    password: 'Qwerty123',
    platform: 'web',
  };
  const authResp = http.post(
    `${BASE_URL}/api/v1/auth/signin`,
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
  // console.log(`auth request body ${authResp.request.body}`);
  // console.log(`auth response body ${authResp.body}`);
  // console.log(`auth response status ${authResp.status}`);

  check200(authResp);
}

export const options = {
  discardResponseBodies: false,

  scenarios: {
    signup: {
      exec: 'signup',
      executor: 'ramping-arrival-rate',
      timeUnit: '1m',
      preAllocatedVUs: 500,

      stages: [
        {
          target: 35,
          duration: '1m',
        },
        {
          target: 35,
          duration: '2m',
        },
        {
          target: 70,
          duration: '1m',
        },
        {
          target: 70,
          duration: '2m',
        },
        {
          target: 105,
          duration: '1m',
        },
        {
          target: 105,
          duration: '2m',
        },
        {
          target: 140,
          duration: '1m',
        },
        {
          target: 140,
          duration: '2m',
        },
        {
          target: 175,
          duration: '1m',
        },
        {
          target: 175,
          duration: '2m',
        },
        {
          target: 210,
          duration: '1m',
        },
        {
          target: 210,
          duration: '2m',
        },
        {
          target: 245,
          duration: '1m',
        },
        {
          target: 245,
          duration: '2m',
        },
        {
          target: 280,
          duration: '1m',
        },
        {
          target: 280,
          duration: '2m',
        },
        {
          target: 315,
          duration: '1m',
        },
        {
          target: 315,
          duration: '2m',
        },
        {
          target: 350,
          duration: '1m',
        },
        {
          target: 350,
          duration: '2m',
        },
      ],
    },
    auth: {
      exec: 'auth',
      executor: 'ramping-arrival-rate',
      timeUnit: '1m',
      preAllocatedVUs: 300,

      stages: [
        {
          target: 12,
          duration: '1m',
        },
        {
          target: 12,
          duration: '2m',
        },
        {
          target: 24,
          duration: '1m',
        },
        {
          target: 24,
          duration: '2m',
        },
        {
          target: 36,
          duration: '1m',
        },
        {
          target: 36,
          duration: '2m',
        },
        {
          target: 48,
          duration: '1m',
        },
        {
          target: 48,
          duration: '2m',
        },
        {
          target: 60,
          duration: '1m',
        },
        {
          target: 60,
          duration: '2m',
        },
        {
          target: 72,
          duration: '1m',
        },
        {
          target: 72,
          duration: '2m',
        },
        {
          target: 84,
          duration: '1m',
        },
        {
          target: 84,
          duration: '2m',
        },
        {
          target: 96,
          duration: '1m',
        },
        {
          target: 96,
          duration: '2m',
        },
        {
          target: 108,
          duration: '1m',
        },
        {
          target: 108,
          duration: '2m',
        },
        {
          target: 120,
          duration: '1m',
        },
        {
          target: 120,
          duration: '2m',
        },
      ],
    },
  },
};

export function handleSummary(data) {
  return {
    'result.html': htmlReport(data),
  };
}
