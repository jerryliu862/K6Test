import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10000,
  duration: '5s',
};
export default function () {
//   http.get('http://test.k6.io');
  http.get('https://4idps-demo4.com');
  sleep(1);
}