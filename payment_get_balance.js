import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '90s', target: 5 }, // simulate ramp-up of traffic
    { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '90s', target: 0 }, // ramp-down to 0 users
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjMyOWVhMzJmLTJiYTctNDdiMC05ZmNiLWIzYTZlZWMzYWViNiIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjYzMzEyNzY4LCJleHAiOjE2NjMzMTk5Njh9.TuhWr9SiNQA97mKQ7aGtU9jpojeIA7Albr-aqeRL_HM';
const query = `query{
  getBalance( limit:3,tokenId: SRLY){
  	status
    message
    body{
      tokenId
      totalBalance
    }
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
  sleep(1);
}