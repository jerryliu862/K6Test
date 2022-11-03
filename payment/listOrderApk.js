import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjRjODBiODBkLWU0NjktNDlmYy05YzdjLTQ5NGNmODkyMDM0NyIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjY3NDY1NzY2LCJleHAiOjE2Njc0NzI5NjZ9.VlaU6Osq78ptuJwMVj033sBnnXUXfsZzJkuJA0wSWuI';

const postData = JSON.stringify({
  query: `query{
    listOrderApk(data:{memberId:"4c80b80d-e469-49fc-9c7c-494cf8920347"}){
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

export default function () {
const res = http.post('https://payment-backend.htln.xyz/graphql',postData, {
  headers: headers,
});
check(res, {'status SUCCESS': (r) => r.body.includes("SUCCESS") });
sleep(1);
}


