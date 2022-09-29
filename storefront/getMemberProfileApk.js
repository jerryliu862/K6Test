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
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjRjODBiODBkLWU0NjktNDlmYy05YzdjLTQ5NGNmODkyMDM0NyIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjY0MjY2ODU1LCJleHAiOjE2NjQyNzQwNTV9.l_E3lUpLnmSJzHbxew_lyE7BKJWLLLRi8uTdNQDeW_s';

const postData = JSON.stringify({
  query: `query {
	  getMemberProfileApk(memberId:"4c80b80d-e469-49fc-9c7c-494cf8920347"){
    status
    message
  }
}`,
  variables: {}
});

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

const qaURL = 'https://storefront-backend.hotline-qa.io/graphql';
const prodURL = 'https://storefront-backend.htln.xyz/graphql';

export default function () {
const res = http.post(qaURL ,postData, {
  headers: headers,
});
  sleep(1);
}


