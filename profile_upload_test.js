import http from "k6/http";
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
export const options = {
  stages: [
    { duration: '15s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minutes.
    { duration: '30s', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '15s', target: 0 }, // ramp-down to 0 users
  ],
};

const img = open("./01.jpg", "b");
// const img1 = open('0')

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM';


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

    let res = http.post('https://media-backend.hotline-qa.io/media/uploadtos3', fd.body(), {
      headers: headers,
    });
    // console.log(res.body,'body')
}
  

// export default function () {
//   const fd = new FormData();
//   fd.append('mediaType', 'MEDIA_TYPE_PROFILE_BACKGROUND');
//   fd.append('userJwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiJwNGVuZ0txR3N4YzNrZFF0U2N2UXJWb1llZ2JHN3hrdHJTNFhESlRBVkxEIiwibWVtYmVySWQiOiIyOTgzYTc2MC1mYmY5LTRhODMtOTg2Yi1hNTI1MWFiZTI0ZDciLCJpYXQiOjE2NDY4MjE3MjgsImV4cCI6OTY3ODc4NTAzMH0.7irKXuLC8sCYk9tec6uBWI-MppHkzDQkdk4YCTEf3fM');
//   fd.append('file', http.file(img1, 'image1.png', 'image/png'));

//   const res = http.post('https://media-backend.hotline-qa.io/media/uploadtos3', fd.body(), {
//     headers: { 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
//   });
//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// }



// discovery
// 	100人同時登入顯示discovery page
// wallet
// 	100人同時取得餘額
// profile
// 	100人同時上傳圖檔
// chat
// 	50人Fan發訊息給Creator,查Creator ChatList
// 	Creator發Blast訊息給50個追蹤FAN 文字訊息,查Creator ChatList
// phurse
// 	50人Fan發Tip給Creator
// 	50人Fan解鎖Creator訊息