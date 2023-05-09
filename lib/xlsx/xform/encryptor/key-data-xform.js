// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');

class KeyDataXform extends BaseXform {
  get tag() {
    return 'keyData';
  }

  parseOpen(node) {
    if (node.name === 'keyData') {
      this.model = {
        saltSize: node.attributes.saltSize,
        blockSize: node.attributes.blockSize,
        keyBits: node.attributes.keyBits,
        hashSize: node.attributes.hashSize,
        cipherAlgorithm: node.attributes.cipherAlgorithm,
        cipherChaining: node.attributes.cipherChaining,
        hashAlgorithm: node.attributes.hashAlgorithm,
        saltValue: node.attributes.saltValue,
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

module.exports = KeyDataXform;
