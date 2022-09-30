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
  ] 
};

const data = JSON.stringify({
  query: `query {
	  getMyTiers{
      status
      message
  }
}`,
  variables: {}
});


export default function () {
  const qaURL = 'https://storefront-backend.hotline-qa.io/graphql';
  const prodURL = 'https://storefront-backend.htln.xyz/graphql';
    const res = http.post(qaURL, data, {
      headers: { 
        'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjMyOWVhMzJmLTJiYTctNDdiMC05ZmNiLWIzYTZlZWMzYWViNiIsInB1YmxpY0tleSI6IjlYTnBRb2V4SjF2SHNhTTVGZ1RXUG9tWlhiUlN3emVLNFo4SFVvZ3plMUVQIiwiaWF0IjoxNjY0NTIxNzkwLCJleHAiOjE4NjQ1Mjg5OTB9.Pa9mXFWMGsF-m2CR1UyRIgZNTeW8OGgZLkuCOgtY510', 
        'Content-Type': 'application/json'
      },
    });
    sleep(1);
}

  
  