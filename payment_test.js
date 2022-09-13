import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '20s', target: 100 }, // below normal load
    { duration: '50s', target: 100 },
    { duration: '20s', target: 200 }, // normal load
    { duration: '50s', target: 200 },
    { duration: '20s', target: 300 }, // around the breaking point
    { duration: '50s', target: 300 },
    { duration: '20s', target: 400 }, // beyond the breaking point
    { duration: '50s', target: 400 },
    { duration: '100s', target: 0 }, // scale down. Recovery stage.
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM';
const query = `mutation order {
  new_order: createOrder(data: {
    txnType: PlatinumTier,
    orderType: PurchaseTier,
    walletAddress: "HHf3NB6jbXs5mTDEQDY2Nyhxzp3scMy7cPgGsCTFRrmk",
    creatorId: "11f1455f-e55d-4b1c-b28f-8d4eff2e4479",
    token: HTLN,
    amount: 0.15,
    orderDetailRef: {
      id: "106ae2b2-0034-4aa9-85d8-5f4ebbe88835",
      memberId: "7f93db1d-bc98-4ae1-a2a1-9a13522cb130",
      tierName: "platinum_tier",
      tierCoverImg:"aa",
      tierPrice:123,
      tierDescription:"DD",
      allowDms:true,
      subscriptionDuration:"DD",
      tierStatus:"deny",
      quantity:123
    },

  }) {
    status
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};



export default function () {
//   http.get('http://test.k6.io');
const res = http.post('https://media-backend.4idps-demo4.com/graphql', JSON.stringify({ query: query }), {
  headers: headers,
});
  sleep(1);
}


