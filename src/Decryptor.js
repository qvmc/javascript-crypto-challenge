const nacl = require('libsodium-wrappers');

var cryptKey;

module.exports = {

    setKey: function (key)
    {
        cryptKey = key;
    },

    decrypt: async function (ciphertext, nonce)
    {
        await nacl.ready;
        if(cryptKey == null){
            throw 'no key'
        }

        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, cryptKey)
    }
};