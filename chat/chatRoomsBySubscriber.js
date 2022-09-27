import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjRjODBiODBkLWU0NjktNDlmYy05YzdjLTQ5NGNmODkyMDM0NyIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjY0MjQ5NTM5LCJleHAiOjE2NjQyNTY3Mzl9.t1ZiQycuoz8DxzkxUf1Wq-dOgoHsSvg4BVkuXONAeoI';

const postData = JSON.stringify({
  query: `query{
    chatRoomsBySubscriber{
        message
        status
    }
  }`,
  variables: {
  }
});

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

export default function () {
  const res = http.post('https://chat-backend.htln.xyz/graphql',postData, {
    headers: headers,
  });
  sleep(1);
}


