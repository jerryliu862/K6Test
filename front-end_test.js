import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 50 }, // below normal load
    { duration: '50s', target: 50 },
    { duration: '20s', target: 100 }, // normal load
    { duration: '50s', target: 100 },
    { duration: '20s', target: 150 }, // around the breaking point
    { duration: '50s', target: 150 },
    { duration: '20s', target: 200 }, // beyond the breaking point
    { duration: '50s', target: 200 },
    { duration: '100s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'https://4idps-demo4.com'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/`, null, { tags: { name: 'PublicCrocs' } }],
    // ['GET', `${BASE_URL}/chat`, null, { tags: { name: 'PublicCrocs' } }],
    // ['GET', `${BASE_URL}/discover`, null, { tags: { name: 'PublicCrocs' } }],
    // ['GET', `${BASE_URL}/wallet`, null, { tags: { name: 'PublicCrocs' } }],
    // ['GET', `${BASE_URL}/wallet`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  sleep(1);
}