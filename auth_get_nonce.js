import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '200s', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ] 
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6Ijg2NDA0N2MxLTVlMTctNGQwZS05ODY5LWMyYzM4MGYxYjhkMyIsInB1YmxpY0tleSI6IjMyVlUxeEFZRE12a3BnNGtqUHNZV3RMNUF4MjJMODZUZ2syUmpjWmdKYlBDIiwiaWF0IjoxNjY3NDU2MzA3LCJleHAiOjE2Njc0NjM1MDd9.Znqot3utGZmzF9Vhfx2njY_vxgG7Y2hS4o3UXc-ULX0';
const query = `query{
  getNonce{
    status 
    message
	  body{
      nonce
    }
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

export default function () {
//   http.get('http://test.k6.io');
const res = http.post('https://auth-backend.hotline-qa.io/graphql', JSON.stringify({ query: query }), {
  headers: headers,
});
  sleep(2);
}


