import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU';

const postData = JSON.stringify({
  query: `query{
    tipInformationApk(creatorId:"4c80b80d-e469-49fc-9c7c-494cf8920347", fanId:"c4cd0bbc-a872-4705-9d59-c013167470f0"){
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


