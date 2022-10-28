import http from 'k6/http';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import { sleep } from 'k6';
export const options = {
  // stages: [
  //   { duration: '10s', target: 100 }, // below normal load
  //   { duration: '1m', target: 100 },
  //   { duration: '10s', target: 1400 }, // spike to 1400 users
  //   { duration: '200s', target: 1400 }, // stay at 1400 for 3 minutes
  //   { duration: '10s', target: 100 }, // scale down. Recovery stage.
  //   { duration: '3m', target: 100 },
  //   { duration: '10s', target: 0 },
  // ],
};

const img = open("./01.jpg", "b");
// const img1 = open('0')

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU';


export default function() {
  const fd = new FormData();
  fd.append('file', http.file(img, '01.jpg', 'image/jpeg'));
  const headers = {
    'access-token': accessToken,
    'Content-Type': 'multipart/form-data; boundary=' + fd.boundary,
  };
    const data = {
      file: http.file(img, '01.jpg'),
      // mediaType: 'MEDIA_TYPE_PROFILE_BACKGROUND',
      // userJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM'
    };
    let res = http.post('https://media-backend.htln.xyz/media/uploadtos3', fd.body(), {
      headers: headers,
    });
    sleep(1);
    // console.log(res.body,'body')
}
  