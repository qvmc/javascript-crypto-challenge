const nacl = require('libsodium-wrappers');

let pubKey, privKey;

module.exports = {
    verifyingKey: async function ()
    {
        await nacl.ready;
        if(privKey == null)
        {
            let obj = nacl.crypto_sign_keypair();
            pubKey = obj.publicKey;
            privKey = obj.privateKey;
        }
        return pubKey;
    },
    sign: async function (signedMsg)
    {
        await nacl.ready;
        return nacl.crypto_sign(signedMsg, privKey);
    }
};