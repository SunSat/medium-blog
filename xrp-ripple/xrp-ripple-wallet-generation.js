const Wallet  = require('xpring-js').Wallet;
const rippleKey = require("ripple-keypairs");
const addressCodec = require('ripple-address-codec');
const sha256 = require('sha256');

function generateWallet() {
    try {
        const unit8Array = sha256('1111',{asBytes: true});
        let options = {
            algorithm : 'ecdsa-secp256k1',
            entropy: unit8Array,
            includeClassicAddress: true,
            test: true
        };
        let secrete = rippleKey.generateSeed(options);
        let wallet = Wallet.generateWalletFromSeed(secrete);
        let classicAddress = addressCodec.xAddressToClassicAddress(wallet.getAddress());
        result = {
            seed: secrete,
            xAddress: wallet.getAddress(),
            address: classicAddress,
            publicKey: wallet.getPublicKey(),
            privateKey: wallet.getPrivateKey()
        }
        console.log(result);
    }catch(err) {
        console.error("Error while creting account and error message is : ", err);
    }
}
generateWallet();

