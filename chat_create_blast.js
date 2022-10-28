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

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU';
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