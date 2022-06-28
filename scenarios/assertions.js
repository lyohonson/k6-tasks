import { check } from 'k6';

export function check200(response) {
  check(response, {
    'status code is 200': (response) => response.status === 200,
  });
}

export function check201(response) {
  check(response, {
    'status code is 201': (response) => response.status === 201,
  });
}
