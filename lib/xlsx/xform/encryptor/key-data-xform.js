// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');

class KeyDataXform extends BaseXform {
  constructor() {
    super();
    this.model = {
      keyData: {},
    };
  }

  get tag() {
    return 'keyData';
  }

  parseOpen(node) {
    // console.log('node--->6', node.name);
    // console.log('node--->6', JSON.stringify(node) );
    // console.log('node--->6sdadsa', this.model);
    if (node.name === 'keyData') {
      this.model.keyData = {
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
