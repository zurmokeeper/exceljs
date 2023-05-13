// const XmlStream = require('../../../utils/xml-stream');
// const BaseXform = require('../base-xform');
const KeyDataXform = require('./encryptor/key-data-xform');
const KeyEncryptorXform = require('./encryptor/key-encryptor-xform');
const BaseXform = require('./base-xform');
const ListXform = require('./list-xform');
const PEncryptedKeyXform = require('./encryptor/p-encrypted-key-xform');

class EncryptorXform extends BaseXform {
  constructor() {
    super();
    this.model = {
      keyData: {},
      keyEncryptors: [],
    };
    this.map = {
      keyData: new KeyDataXform(),
      keyEncryptors: new ListXform({
        tag: 'keyEncryptors',
        count: true,
        childXform: new PEncryptedKeyXform(),
      }),
    };
  }

  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case 'encryption':
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        return true;
    }
  }

  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case 'encryption': {
        const add = (propName, xform) => {
          if (xform.model) {
            this.model[propName] = xform.model;
          }
        };
        add('keyData', this.map.keyData);
        add('keyEncryptors', this.map.keyEncryptors);
        return false;
      }
      default:
        return true;
    }
  }
}

module.exports = EncryptorXform;
