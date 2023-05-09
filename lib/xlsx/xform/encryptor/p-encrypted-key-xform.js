// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');

class PEncryptedKey extends BaseXform {
  get tag() {
    return 'p:encryptedKey';
  }

  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        spinCount: node.attributes.spinCount,
        saltSize: node.attributes.saltSize,
        blockSize: node.attributes.keyBits,
        hashSize: node.attributes.hashSize,
        cipherAlgorithm: node.attributes.cipherAlgorithm,
        cipherChaining: node.attributes.cipherChaining,
        hashAlgorithm: node.attributes.hashAlgorithm,
        saltValue: node.attributes.saltValue,
        encryptedVerifierHashInput: node.attributes.encryptedVerifierHashInput,
        encryptedVerifierHashValue: node.attributes.encryptedVerifierHashValue,
        encryptedKeyValue: node.attributes.encryptedKeyValue,
      };
      return true;
    }
    return false;
  }

  parseText() {}

  parseClose() {
    return false;
  }
}

module.exports = PEncryptedKey;
