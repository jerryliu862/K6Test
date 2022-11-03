import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6Ijg2NDA0N2MxLTVlMTctNGQwZS05ODY5LWMyYzM4MGYxYjhkMyIsInB1YmxpY0tleSI6IjMyVlUxeEFZRE12a3BnNGtqUHNZV3RMNUF4MjJMODZUZ2syUmpjWmdKYlBDIiwiaWF0IjoxNjY3NDU2MzA3LCJleHAiOjE2Njc0NjM1MDd9.Znqot3utGZmzF9Vhfx2njY_vxgG7Y2hS4o3UXc-ULX0';

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


