import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // stages: [
  //   { duration: '10s', target: 100 }, // below normal load
  //   { duration: '1m', target: 100 },
  //   { duration: '10s', target: 1400 }, // spike to 1400 users
  //   { duration: '200s', target: 1400 }, // stay at 1400 for 3 minutes
  //   { duration: '10s', target: 100 }, // scale down. Recovery stage.
  //   { duration: '3m', target: 100 },
  //   { duration: '10s', target: 0 },
  // ],
};

var data = JSON.stringify({
  query: `query{
    getTokenList{
      status
      message
    }
  }`,
  variables: {}
});
 
export default function () {
  // const qaURL = 'https://payment-backend.hotline-qa.io/graphql';
  const prodURL = 'https://payment-backend.htln.xyz/graphql';
    const res = http.post(prodURL, data, {
      headers: { 
        'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjRjODBiODBkLWU0NjktNDlmYy05YzdjLTQ5NGNmODkyMDM0NyIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjY3NDY1NzY2LCJleHAiOjE2Njc0NzI5NjZ9.VlaU6Osq78ptuJwMVj033sBnnXUXfsZzJkuJA0wSWuI', 
        'Content-Type': 'application/json'
      },
    });
  check(res, {'status SUCCESS': (r) => r.body.includes("SUCCESS") });
sleep(1);
}

