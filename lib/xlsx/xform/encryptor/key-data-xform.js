// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');

class KeyDataXform extends BaseXform {
  constructor() {
    super();
    this.model = {
    };
  }

  get tag() {
    return 'keyData';
  }

  // <keyData saltSize="16" blockSize="16" keyBits="256" hashSize="64" cipherAlgorithm="AES" cipherChaining="ChainingModeCBC" hashAlgorithm="SHA512" saltValue="RL3jtFlXRRCcHsbK+qRC3g=="/>
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = node.attributes;
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
