import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    { duration: '3s', target: 1500 }, // simulate ramp-up of traffic
    // { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
    // { duration: '90s', target: 0 }, // ramp-down to 0 users
  ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjQwZDgxMzg5LTgxN2MtNDdhZi04MmMwLTlhZmI4ZjIxN2UyNyIsInB1YmxpY0tleSI6IjlRaUQ4bUJRVXhqVHdya29uYloxWXZ2bmtERzNINVRaRzdkaVQxdXJhNEJLIiwiaWF0IjoxNjQ5ODQwNzExLCJleHAiOjE2OTk4NDc5MTF9.OCLs3nQq8m8EYdpielBfMct_ql_nyv9Ls_Y7Ni0Oh1g';

const postData = JSON.stringify({
  query: `query {
    getSingleItemApk(data: { itemId: "06e5f0ca-e85c-4e42-9cf3-9aff5bef6e49" }) {
      status
      message
  
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
const res = http.post('https://media-backend.htln.xyz/graphql',postData, {
  headers: headers,
});
  sleep(1);
}


