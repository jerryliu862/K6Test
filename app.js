const web3 = require('@solana/web3.js');
const crypto = require('crypto');
const axios = require('axios').default;

/* create wallet */
// createUser();

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
    console.log(response.data.data.insertUser.message,'------success');
    // return response?.data;
  } catch (error) {
    console.log('---GQL Bad Request---');
    console.log(error.status);
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

// console.log(addFans());
for(let i=0; i<=50; i++){
  addFans()
}