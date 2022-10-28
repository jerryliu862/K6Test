import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU';

const postData = JSON.stringify({
  query: `mutation CreateOrder( $creatorId: String!, $token:SystemTokenEnum!, $amount:Float!){
    createOrder(data: {txnType: PlatinumTier
  ,creatorId: $creatorId, token: $token, amount: $amount}){
      message
      status
    }
  }`,
  variables: {
    "creatorId":"4cd8daae-98c2-4ab6-87d1-e5bae9e6536e",
    "token":"SOL",
    "amount":10
  }
});

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};



export default function () {
//   http.get('http://test.k6.io');
const res = http.post('https://payment-backend.hotline-qa.io/graphql',postData, {
  headers: headers,
});
  sleep(1);
}


