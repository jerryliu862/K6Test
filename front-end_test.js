import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 100 }, // below normal load
    { duration: '50s', target: 100 },
    { duration: '20s', target: 200 }, // normal load
    { duration: '50s', target: 200 },
    { duration: '20s', target: 300 }, // around the breaking point
    { duration: '50s', target: 300 },
    { duration: '20s', target: 400 }, // beyond the breaking point
    { duration: '50s', target: 400 },
    { duration: '100s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const res = http.get('https://4idps-demo4.com');
    sleep(1);
  }
  