import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '90s', target: 5 }, // simulate ramp-up of traffic
    { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '90s', target: 0 }, // ramp-down to 0 users
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM';
const query = `query {
  getItemsApk(data: { memberId: "17305096-3aa3-4e24-973e-c2585ecbea2a" }) {
    status
    message
    body {
      id
      title
      description
      url
      itemType
      itemStatus
    }
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};



export default function () {
const res = http.post('https://media-backend.hotline-qa.io/graphql', JSON.stringify({ query: query }), {
  headers: headers,
});
  sleep(1);
}

