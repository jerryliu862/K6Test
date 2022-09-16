import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '15s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
    { duration: '30s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '15s', target: 0 }, // ramp-down to 0 users
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjE1OTMzYjA3LWNiYWMtNDcyMC1iODFiLTQxNzc5ZWI3NDQ4MyIsInB1YmxpY0tleSI6InA0ZW5nS3FHc3hjM2tkUXRTY3ZRclZvWWVnYkc3eGt0clM0WERKVEFWTEQiLCJpYXQiOjE2NDgwMzkzNjYsImV4cCI6MTY5ODEyNTc2Nn0.--45nzDHlzqulFYn6L4ZKU3XPSSoQ2FnRYADDlHorwo';
const query = `query {
  getHotCreators { 
      status
      message
      body{
          id
          displayName
          userName
          avatar
          background
      }
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

export default function () {
  const res = http.post('https://storefront-backend.hotline-qa.io/graphql', JSON.stringify({ query: query }), {
    headers: headers,
  });
  sleep(1);
}


