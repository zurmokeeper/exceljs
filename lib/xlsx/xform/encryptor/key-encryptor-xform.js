// const _ = require('../../../utils/under-dash');
const BaseXform = require('../base-xform');
const PEncryptedKeyXform = require('./p-encrypted-key-xform');

class KeyEncryptorXform extends BaseXform {
  get tag() {
    return 'keyEncryptors';
  }

  constructor(options) {
    super();

    this.map = {
      keyEncryptor: new PEncryptedKeyXform(),
    };
  }

  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case 'keyEncryptors':
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
    }
    return false;
  }

  parseText() {}

  parseClose() {
    return false;
  }
}

module.exports = KeyEncryptorXform;
