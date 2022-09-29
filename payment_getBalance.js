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
      name: "get Balance"
    }
  }
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjMyOWVhMzJmLTJiYTctNDdiMC05ZmNiLWIzYTZlZWMzYWViNiIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjYzMzEyNzY4LCJleHAiOjE2NjMzMTk5Njh9.TuhWr9SiNQA97mKQ7aGtU9jpojeIA7Albr-aqeRL_HM';
const query = `query{
  getBalance( limit:3,tokenId: SRLY){
  	status
    message
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

export default function () {
  const res = http.post('https://payment-backend.hotline-qa.io/graphql', JSON.stringify({ query: query }), {
    headers: headers,
  });
  sleep(2);
}