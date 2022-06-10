import { check } from 'k6';

export default function check200(response) {
  check(response, {
    'status code is 200': (response) => response.status === 200,
  });
}
