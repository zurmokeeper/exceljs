// const XmlStream = require('../../../utils/xml-stream');
// const BaseXform = require('../base-xform');
const KeyDataXform = require('./encryptor/key-data-xform');
const KeyEncryptorXform = require('./encryptor/key-encryptor-xform');
const BaseXform = require('./base-xform');
const ListXform = require('./list-xform');

class EncryptorXform extends BaseXform {
  constructor(model) {
    super();

    this.map = {
      keyData: new KeyDataXform(),
      keyEncryptors: new ListXform({
        tag: 'keyEncryptors',
        count: false,
        childXform: new KeyEncryptorXform(),
      }),
    };
  }

  parseOpen(node) {
    // console.log('node--->', this.parser)
    // console.log('node--->', node.name)
    // console.log('node--->', JSON.stringify(node) )
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case 'encryption':
        return true;
      default:
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
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
        this.model.values.push(this.parser.model);
        this.model.count++;
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case 'sst':
        return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
}

module.exports = EncryptorXform;
