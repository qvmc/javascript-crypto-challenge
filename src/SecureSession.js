const nacl = require('libsodium-wrappers');

var clientPublicKey;
var serverPublicKey;
var serverPrivateKey;
var rx, tx;

module.exports = {

    setClientPublicKey: function(key)
    {
        if(clientPublicKey != null && key !== clientPublicKey)
        {
            throw 'client public key already set'
        }
        else {
            clientPublicKey = key;
        }
    },

    serverPublicKey: async function()
    {
        await nacl.ready;
        const keypair = nacl.crypto_kx_keypair();
        serverPublicKey = keypair.publicKey;
        serverPrivateKey = keypair.privateKey;

        const sharedKeys = nacl.crypto_kx_server_session_keys(serverPublicKey, serverPrivateKey, clientPublicKey);
        rx = sharedKeys.sharedRx;
        tx = sharedKeys.sharedTx;

        return serverPublicKey;
    },

    decrypt: async function(ciphertext, nonce)
    {
        await nacl.ready;
        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, rx)
    },

    encrypt: async function(msg)
    {
        let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
        let ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx);
        return {ciphertext, nonce};
    }
};