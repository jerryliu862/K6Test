import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '200s', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
  ext: {
    loadimpact: {
      projectID: 3602823,
      // Test runs with the same name groups test runs together
      name: "get nonce"
    }
  }  
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM';
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


