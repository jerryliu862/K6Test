import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '90s', target: 5 }, // simulate ramp-up of traffic
    { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '90s', target: 0 }, // ramp-down to 0 users
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjQwZDgxMzg5LTgxN2MtNDdhZi04MmMwLTlhZmI4ZjIxN2UyNyIsInB1YmxpY0tleSI6IjlRaUQ4bUJRVXhqVHdya29uYloxWXZ2bmtERzNINVRaRzdkaVQxdXJhNEJLIiwiaWF0IjoxNjQ5ODQwNzExLCJleHAiOjE2OTk4NDc5MTF9.OCLs3nQq8m8EYdpielBfMct_ql_nyv9Ls_Y7Ni0Oh1g';

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


