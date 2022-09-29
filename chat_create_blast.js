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
  ext: {
    loadimpact: {
      projectID: 3602823,
      // Test runs with the same name groups test runs together
      name: "create blast"
    }
  } 
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjQwZDgxMzg5LTgxN2MtNDdhZi04MmMwLTlhZmI4ZjIxN2UyNyIsInB1YmxpY0tleSI6IjlRaUQ4bUJRVXhqVHdya29uYloxWXZ2bmtERzNINVRaRzdkaVQxdXJhNEJLIiwiaWF0IjoxNjQ5ODQwNzExLCJleHAiOjE2OTk4NDc5MTF9.OCLs3nQq8m8EYdpielBfMct_ql_nyv9Ls_Y7Ni0Oh1g';
const postData = JSON.stringify({
  query: `mutation createBlast($input: CreateChatBlastInput!){
    createBlast(input: $input) {
        status
        message
        body {
            id
            senderId
        }   
    }
}`,
  variables: {"input":{"groupId":"Free","messageContent":"hi this is from 7e27 text blast 7"}}
});
const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};

export default function () {
  const res = http.post('https://chat-backend.hotline-qa.io/graphql', postData, {
    headers: headers,
  });
  sleep(1);
}