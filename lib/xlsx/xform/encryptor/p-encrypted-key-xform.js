// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');

class PEncryptedKey extends BaseXform {
  constructor() {
    super();
    this.model = {
      'p:encryptedKey': {},
    };
  }

  get tag() {
    return 'p:encryptedKey';
  }

  // <p:encryptedKey spinCount="100000" saltSize="16" blockSize="16" keyBits="256" hashSize="64" cipherAlgorithm="AES" cipherChaining="ChainingModeCBC" hashAlgorithm="SHA512" saltValue="Sjiwa9DpbAgtT2U7FyJkfA==" encryptedVerifierHashInput="ZB62f8MdYZCZwRoeJiChwg==" encryptedVerifierHashValue="sBn8zqKTHGQoCMOfe6Ptlq3n5mLZCx7gRHApQl6CXfvDJolmrsV3/V6/t/spLvRDBR8dcHUySjIHJXIf4ukSmw==" encryptedKeyValue="cqG2QhdLnOd0ENWGT+UMM/lAIlqSxmIKIN7inUuApZU="/>
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model[this.tag] = node.attributes;
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
