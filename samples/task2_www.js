import http from 'k6/http';
import check200 from './assertions.js';

export function openWwwRu() {
  const yaResp = http.get('http://www.ru');
  check200(yaResp);
}

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      // It should start `startRate` iterations per minute
      timeUnit: '1m',
      preAllocatedVUs: 4,

      stages: [
        { target: 120, duration: '5m' },
        { target: 120, duration: '10m' },
        { target: 144, duration: '5m' },
        { target: 144, duration: '10m' },
      ],
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  openWwwRu();
}
