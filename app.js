const web3 = require('@solana/web3.js');
const crypto = require('crypto');
const { exit } = require('process');
const axios = require('axios').default;


const insertMember = async(username, walletAddress) =>{
  const url = 'https://retool-api.hotline-qa.io/graphql';
  const data = {
    query: `mutation insertUser($username:String!, $walletAddress:String!){
      insertUser(username: $username, walletAddress:$walletAddress) {
        status
        message
      }
    }
    `,
    variables: `{
    "username": "${username}",
    "walletAddress": "${walletAddress}"
    }`,
  };
  // console.log(data,'data');
  const response = await httpPost(url, data, {
    'RETOOL-API-KEY': 'retool_dev_api_key',
    'Content-Type': 'application/json',
  });
}

const httpPost = async(url, requestBody , headers ) => {
  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data,'------success');
    // return response?.data;
  } catch (error) {
    console.log('---GQL Bad Request---');
    console.log(error);
  }
}


// console.log(`test-${new Date().valueOf()}`  )
// insertMember(`0test${new Date().valueOf()}`, '4nB41TiWPP5VZ7a4qZH9UhDS9MvyBunkgoTrVnhyN5pn')

const addFans = async()=>{
  let rsp = {
    publicKey: '',
    secretKey: '',
  };
  let w = web3.Keypair.generate();
  rsp.publicKey = w.publicKey.toBase58();
  const k = 'NCKDJCNFHWPDJJDUCNQPDIOKDLEJSCND';
  const i = '8DFED197BA48531E';
  const cipher = crypto.createCipheriv('aes-256-cbc', k, i);
  buffer = Buffer.concat([
    cipher.update(w.secretKey.join(',')),
    cipher.final()
  ]);
  // set data
  rsp.secretKey = buffer.toString('base64');
  // console.log(rsp,'rsp.publicKey');
  insertMember(`0test${new Date().valueOf()}`, rsp.publicKey)

}

let fanIdList = [
  "85733d74-a707-4354-ba8a-80b09f3b30f6",
  "b512871a-597e-4e7a-a46e-980b500e7394",
  "8d4ce282-fb6c-42da-b506-cc66286fc0da",
  "04a97285-4a9e-404f-bf7e-2b320e8cdb53",
  "651410f3-02c3-4989-9556-ce2f82be76db",
  "16c53de6-f2e5-439d-b45c-5cf78875c342",
  "435cbae8-9f6f-46de-a2db-1fdf53025ee2",
  "730b9975-87db-4910-aad9-168fbb796223",
  "e4006af1-2606-4a6d-a4c8-98b789ff328a",
  "1df8e470-2010-4371-802a-0ab6ba6dcae0",
  "2862ce1d-85d9-49f6-82b2-e9878da7f706",
  "390a8653-2150-4860-b08e-1b7f7eeb87b9",
  "a8465fee-ed01-4b6e-a40b-7bb231a724f0",
  "3059827c-8b10-4eea-9817-3f76752c326b",
  "adba9772-35c8-4d36-ab74-a90cab3bba2d",
  "4efb7046-05fe-4719-980f-add66ad0441f",
  "269bc523-c623-449c-b766-cc354a84dd2a",
  "0e194464-7d7f-4671-8020-55c9d4a50523",
  "eaea8dba-34f0-4cc4-adc7-c50913df9822",
  "7a6fd940-3fa5-49c5-8831-161a953337fb",
  "47a3bca5-6016-439f-bd9b-523a3fe350e2",
  "73862208-fe37-4f91-8839-fcfcc0bbfb7c",
  "2b57cba1-acea-4745-8641-66f54195b9c4",
  "8f6ad851-d591-469b-8f9c-709c1db4ac7a",
  "eea40d3e-f664-4af3-90ca-e459591fb74d",
  "bed28c00-486e-4f20-8d61-640c494597f3",
  "a5ced668-874c-400b-ba39-bbd93d931d94",
  "31e7f268-601d-4e18-87cb-e693bd3a423c",
  "53ab2abd-0f89-4056-9aeb-871f740b1b80",
  "2ddacf63-879d-443c-97d5-1ed278f91ecc",
  "0a48dbce-91ac-4229-a282-4aad3739335a",
  "b22b782f-c342-45c5-86dd-6dcb94a47dfa",
  "fc93f4e8-27e0-489c-bd19-bbfd25cf1cb8",
  "69d379f7-52d1-4770-a4bb-2826b989e9e5",
  "2df34b2f-7f86-4b70-85f8-69a5aff7b575",
  "ca6379e0-5664-43d2-955c-9ddb5f0387e6",
  "912b7dbb-47f1-4320-82d1-3e3584bb2fc4",
  "7b82c529-7b7b-44a4-bffb-a0119dc18590",
  "9469f9c5-5106-416a-9ba2-76e1d1135996",
  "20283e8f-7850-495b-b923-64c3938a7fa6",
  "d41666dc-14a4-4c47-a749-824f4fa36e76",
  "1e2258a3-c7ec-4c81-832c-8a92c858e3cc",
  "024d6c12-2920-435b-85f0-09a749c81f71",
  "2096d8e5-d18b-4a1b-a476-1fa3bf4ef255",
  "4e423269-15a9-4b92-94d5-19e52474102d",
  "20f30e3b-0c58-4268-a144-d81abb6409be",
  "5abcba14-6a18-499e-a83e-dc57783d312b",
  "8121c346-ab28-4143-834d-1f46ba485737",
  "c496fb72-3854-468a-a67b-54e15ebf0d5a",
  "4ef521e7-a1a9-4133-8b7d-b32871de2437"
]
// console.log(addFans());
// for(let i=0; i<=50; i++){
//   addFans()
// }

const createMessage = async () =>{
  const url = 'https://chat-backend.hotline-qa.io/graphql';
  const data = {
    query: `mutation createMessage($input: ChatMessageInput!){
      createMessage(input: $input) {
          status
          body {
              id
          }
        }
      }`,
    variables: `{
      "input":{
        "chatRoomId":"632a9f00b21a9d013e3f10ac",
        "senderId":"4cd8daae-98c2-4ab6-87d1-e5bae9e6536e",
        "receiverId":"024d6c12-2920-435b-85f0-09a749c81f71",
        "messageContent":"1f72 to 536e tip message from 9/21-3",
        "sendAt":"2022-09-21 03:00:00.000Z",
        "isTip":true,
        "itemIds":"item",
        "price":10
      }
    }`,
  };
  console.log(data,'data');
  const response = await httpPost(url, data, {
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU',
    'Content-Type': 'application/json',
  });
}
// createMessage();



const createBlast = async () =>{
  const url = 'https://chat-backend.hotline-qa.io/graphql';
  const data = {
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
    variables: `{
      "input":{
        "groupId":"Free",
        "messageContent":"hi this is from 7e27 text blast 7"
      }
    }`,
  };
  console.log(data,'data');
  const response = await httpPost(url, data, {
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6IjY5NTRlODkwLWQxOWMtNDhlYi1iNmZlLWQ3NzEwOTcxN2VkZiIsInB1YmxpY0tleSI6IkRCVGF0WmhpSGZGdGlXZ2JKWHlGQXhydlB4b0ZWeGRFM2ZZd1RGRlpRaWE2IiwiaWF0IjoxNjY2ODUxNzQyLCJleHAiOjE2NjY4NTg5NDJ9.36ysmj5828ca2EdwPcp8e0OkT03f6nxX58v3ioa09qU',
    'Content-Type': 'application/json',
  });
}
// createBlast();