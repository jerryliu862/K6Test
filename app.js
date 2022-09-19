const { v4: uuidv4 } = require('uuid');
const web3 = require('@solana/web3.js');
const crypto = require('crypto');
/* create wallet */
this.createWallet = async function () {
    let rsp = {
      success: false,
      publicKey: '',
      secretKey: '',
      msg: '',
      chain: this.chain,
    };
    return new Promise((resolve, reject) => {
      try {
        let w = web3.Keypair.generate();
        rsp.publicKey = w.publicKey.toBase58();
        // encrypt
        try {
          rsp.secretKey = cipherEncrypt(w.secretKey.join(',')).data;
          rsp.success = true;
          resolve(rsp);
        } catch (e) {
          rsp.msg = `Failed to create new wallet: ${e.message}`;
          resolve(rsp);
        }
      } catch (e) {
        rsp.msg = `Failed to create new wallet: ${e.message}`;
        resolve(rsp);
      }
 
    });
};
  /* CPIHER - encrypt */
  function cipherEncrypt(_data) {
    const res = {
      success: false,
      msg: '',
      data: '',
    };

    try {
    // const k = self.getEnv('CIPHER_KEY');
    // const i = self.getEnv('CIPHER_IV');
      const k = 'NCKDJCNFHWPDJJDUCNQPDIOKDLEJSCND';
      const i = '8DFED197BA48531E';
      const cipher = crypto.createCipheriv('aes-256-cbc', k, i);
      buffer = Buffer.concat([
        cipher.update(_data),
        cipher.final()
      ]);
      // set data
      res.data = buffer.toString('base64');
      res.success = true;
    } catch (e) {
      res.msg = e.message;
    }
    //
    return res;
  }
const insertList = [];  
const createUser = async() =>{
    
    for(let i=0 ;i<=50; i++){
        const tempWalletRes = await this.createWallet();
        if (tempWalletRes?.success !== true) {
          return 'Creating temp wallet failed';
        }
        const tempWalletData = {};
        // tempWalletData.memberId = "ad94a0f2-ae04-4127-abd8-a2865181f69b";
        // tempWalletData.orderId = uuidv4();
        tempWalletData.publicKey = tempWalletRes.publicKey;
        tempWalletData.secretKey = tempWalletRes.secretKey;
        // tempWalletData.createdBy = "ad94a0f2-ae04-4127-abd8-a2865181f69b";
        tempWalletData.createdAt = new Date();
        insertList.push(tempWalletData);

    }
    
    console.log(insertList);
}
createUser();
