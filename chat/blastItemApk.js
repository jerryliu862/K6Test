import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // stages: [
  //   { duration: '90s', target: 5 }, // simulate ramp-up of traffic
  //   { duration: '180s', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '90s', target: 0 }, // ramp-down to 0 users
  // ],
};

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6Ijg2NDA0N2MxLTVlMTctNGQwZS05ODY5LWMyYzM4MGYxYjhkMyIsInB1YmxpY0tleSI6IjMyVlUxeEFZRE12a3BnNGtqUHNZV3RMNUF4MjJMODZUZ2syUmpjWmdKYlBDIiwiaWF0IjoxNjY3NDU2MzA3LCJleHAiOjE2Njc0NjM1MDd9.Znqot3utGZmzF9Vhfx2njY_vxgG7Y2hS4o3UXc-ULX0';

const postData = JSON.stringify({
  query: `query{
    blastItemApk(
      itemId:"a0dc5399-9653-48e0-a696-4cd51b68fdcf",
      memberId:"62366cc8-a68d-4601-8359-e16cc7406911"){
        message
        status
        body{
          description
          createdAt
        }
    }
  }`,
  variables: {
  }
});

const headers = {
  'access-token': accessToken,
  'Content-Type': 'application/json',
};
const qaURL = "https://chat-backend.hotline-qa.io/graphql";
const prodURL = "https://chat-backend.htln.xyz/graphql";

export default function () {
  const res = http.post(prodURL, postData, {
    headers: headers,
  });
check(res, { 'is status 200': (r) => r.status === 200 });
sleep(1);
}


