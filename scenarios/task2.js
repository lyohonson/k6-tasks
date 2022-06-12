import http from 'k6/http';
import check200 from './assertions.js';

export function openYaRu() {
  const yaResp = http.get('https://ya.ru');
  check200(yaResp);
}

export function openWwwRu() {
  const yaResp = http.get('http://www.ru');
  check200(yaResp);
}

export const options = {
  discardResponseBodies: true,

  scenarios: {
    ya: {
      exec: 'openYaRu',
      executor: 'ramping-arrival-rate',
      timeUnit: '1m',
      preAllocatedVUs: 4,

      stages: [
        { target: 60, duration: '5m' },
        { target: 60, duration: '10m' },
        { target: 72, duration: '5m' },
        { target: 72, duration: '10m' },
      ],
    },
    www: {
      exec: 'openWwwRu',
      executor: 'ramping-arrival-rate',
      timeUnit: '1m',
      preAllocatedVUs: 4,

      stages: [
        { target: 60, duration: '5m' },
        { target: 60, duration: '10m' },
        { target: 72, duration: '5m' },
        { target: 72, duration: '10m' },
      ],
    },
  },
};
