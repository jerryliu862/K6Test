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

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjQwZDgxMzg5LTgxN2MtNDdhZi04MmMwLTlhZmI4ZjIxN2UyNyIsInB1YmxpY0tleSI6IjlRaUQ4bUJRVXhqVHdya29uYloxWXZ2bmtERzNINVRaRzdkaVQxdXJhNEJLIiwiaWF0IjoxNjQ5ODQwNzExLCJleHAiOjE2OTk4NDc5MTF9.OCLs3nQq8m8EYdpielBfMct_ql_nyv9Ls_Y7Ni0Oh1g';
const query = `query subscriberCount($creatorId: ID!) {
  subscriberCount(creatorId: $creatorId){
    status
    message
    body 
  }
}`;

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};



export default function () {
const res = http.post('https://chat-backend.4idps-demo4.com/graphql', JSON.stringify({ query: query,variables: { creatorId: "7d5c3c06-655b-4f86-be27-fb4949feca4c" }, }), {
  headers: headers,
});
  sleep(1);
}


